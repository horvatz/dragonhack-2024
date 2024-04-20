import { FlatList } from "react-native";
import { OpenAI, useChat } from "react-native-gen-ui";
import { z } from "zod";
import SearchingLocation from "../components/loaders/searching-location";
import LocationMap from "../components/location-map";
import LoadingWeather from "../components/loaders/weather";
import Weather from "../components/weather";
import React, { useState } from "react";
import { fetchWeatherData } from "../utils/fetch-weather-data";
import { fetchLocation } from "../utils/fetch-reverse-geocode";
import ChatContainer from "../components/chat/chat-container";
import ChatMessage from "../components/chat/chat-message";
import { getDeviceLocation } from "../utils/get-device-location";
import * as ImagePicker from "expo-image-picker";
import { systemPrompt } from "../utils/constants";
import ChatInput from "../components/chat/chat-input";

const openAi = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY ?? "",
  model: process.env.EXPO_PUBLIC_OPENAI_MODEL || "gpt-4-turbo",
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
        content: systemPrompt,
        role: "system",
      },
      {
        content: "Hello, how can I help you today?",
        role: "assistant",
      },
      {
        content: [
          {
            type: "image_url",
            image_url: {
              url: "data:image/jpeg;base64,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",
            },
          },
        ],
        role: "user",
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
      <ChatInput
        input={input}
        isStreaming={isStreaming}
        isLoading={isLoading}
        onCameraPress={openCamera}
        onInputChange={onInputChange}
        onSubmit={handleSubmit}
      />
    </ChatContainer>
  );
}
