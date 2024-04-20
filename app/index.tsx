import { FlatList, TouchableOpacity, View } from "react-native";
import { OpenAI, useChat } from "react-native-gen-ui";
import { z } from "zod";
import SearchingLocation from "../components/loaders/searching-location";
import LocationMap from "../components/location-map";
import LoadingWeather from "../components/loaders/weather";
import Weather from "../components/weather";
import React, { useState } from "react";
import { fetchWeatherData } from "../utils/fetch-weather-data";
import { fetchLocation } from "../utils/fetch-reverse-geocode";
import ChatInput from "../components/chat/chat-input";
import ChatSubmitButton from "../components/chat/chat-submit-button";
import ChatContainer from "../components/chat/chat-container";
import ChatMessage from "../components/chat/chat-message";
import { getDeviceLocation } from "../utils/get-device-location";
import { Camera as CameraIcon } from "lucide-react-native";
import colors from "tailwindcss/colors";
import * as ImagePicker from "expo-image-picker";

const openAi = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY ?? "",
  model: process.env.EXPO_PUBLIC_OPENAI_MODEL || "gpt-4",
  // You can even set a custom basePath of your SSE server
});

export default function App() {
  const {
    input,
    error,
    isLoading,
    isStreaming,
    messages,
    handleSubmit,
    onInputChange,
  } = useChat({
    openAi,
    initialMessages: [
      {
        content: "Hello, how can I help you today?",
        role: "assistant",
      },
    ],
    onError: (error) => {
      console.error("Error while streaming:", error);
    },
    onSuccess: () => {
      console.log("✅ Streaming done!");
    },
    tools: {
      getLocation: {
        description: "Rank user clothes",
        parameters: z.object({
          image: z.string(),
        }),
        render: async function* () {
          yield <SearchingLocation />;

          const location = await getDeviceLocation();

          const geoLocation = await fetchLocation(
            location.coords.latitude,
            location.coords.longitude
          );

          const locationName = `${geoLocation.address.city}, ${geoLocation.address.country}`;

          return {
            component: (
              <LocationMap
                latitude={location.coords.latitude}
                longitude={location.coords.longitude}
                locationName={locationName}
              />
            ),
            data: {
              location: {
                locationName,
                details: geoLocation,
              },
            },
          };
        },
      },
      getWeather: {
        description: "Get weather for a location",
        parameters: z.object({
          date: z.date().default(() => new Date()),
          location: z.string(),
        }),
        render: async function* (args) {
          yield <LoadingWeather />;

          const weatherData = await fetchWeatherData(args.location);

          return {
            component: (
              <Weather
                location={args.location}
                current={weatherData[0]}
                forecast={weatherData}
              />
            ),
            data: {
              instruction: "Describe the weather in 2-3 sentences.",
              current: weatherData[0],
              forecast: weatherData,
              location: args.location,
            },
          };
        },
      },
    },
  });

  // Base64 of image
  const [image, setImage] = useState<string | null>(null);

  const openCamera = async () => {
    // No need to manually handle permissions with expo-image-picker
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [4, 3],
      base64: true,
      quality: 1,
    });

    console.log({ result });
    if (!result.canceled) {
      if (result.assets[0].base64) {
        // Set base64 of image
        console.log("Setting image");
        setImage(result.assets[0].base64);
      }
    }
  };

  return (
    <ChatContainer>
      {/* List of messages */}
      <FlatList
        data={messages}
        inverted
        contentContainerStyle={{
          flexDirection: "column-reverse",
          padding: 12,
        }}
        renderItem={({ item, index }) => (
          // Individual message component
          <ChatMessage
            message={item}
            isLastMessage={index === messages.length - 1}
            isLoading={isLoading}
            isStreaming={isStreaming}
            error={error}
          />
        )}
      />

      <View className="flex flex-row items-end p-3 gap-x-1">
        {/* Camera button */}
        <View className="shrink-0">
          <TouchableOpacity
            className="flex flex-row items-center justify-center bg-gray-50 border border-gray-200 rounded-full w-14 h-[46px] gap-x-2"
            disabled={isLoading}
            onPress={openCamera}
          >
            <CameraIcon
              color={colors.sky[500]}
              size={16}
              className="h-12 w-12"
            />
          </TouchableOpacity>
        </View>

        {/* Text input field */}
        <View className="grow basis-0">
          <ChatInput input={input} onInputChange={onInputChange} />
        </View>

        {/* Submit button */}
        <View className="shrink-0">
          <ChatSubmitButton
            isLoading={isLoading}
            isStreaming={isStreaming}
            input={input}
            handleSubmit={handleSubmit}
          />
        </View>
      </View>
    </ChatContainer>
  );
}
