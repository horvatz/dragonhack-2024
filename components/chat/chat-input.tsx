import { CameraIcon } from "lucide-react-native";
import { Pressable, ScrollView, Text } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import ChatTextInput from "./chat-text-input";
import ChatSubmitButton from "./chat-submit-button";
import colors from "tailwindcss/colors";
import * as ImagePicker from "expo-image-picker";
import { getOcassionPrompt } from "../../utils/helpers";
import { useImageStore } from "../../utils/image-store";
import { wait } from "../../utils/wait";

interface ChatInputProps {
  input: string;
  isStreaming: boolean;
  isLoading: boolean;
  onInputChange: (text: string) => void;
  setInput: (input: string) => void;
  onSubmit: (input: string, image: string | null) => void;
}

const ChatInput = ({
  input,
  isStreaming,
  isLoading,
  setInput,
  onInputChange,
  onSubmit,
}: ChatInputProps) => {
  // Base64 of image
  const [image, setImage] = useState<string | null>(null);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const openCamera = async () => {
    // Request permission to access camera if not already granted
    if (status?.status === "undetermined") {
      await requestPermission();
    }

    // No need to manually handle permissions with expo-image-picker
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      console.log("Image was taken");
      if (result.assets[0].base64) {
        // Set base64 of image
        const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
        console.log("Setting image: ", base64.slice(0, 50));
        setImage(base64);
      } else {
        console.log("Image not found: ", result.assets[0].base64?.slice(0, 50));
      }
    }
  };

  return (
    <View>
      <ScrollView
        className="h-12 mt-2"
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="mx-4 pr-8 flex flex-row justify-center items-center gap-x-2"
      >
        {/* Scrollable badges with fashion ocassions */}
        <Pressable
          className="p-2 border rounded-full border-sky-400 w-28"
          onPress={() =>
            setInput("What do you think about this outfit? Rate my style!")
          }
        >
          <Text className="font-bold text-center text-sky-400">Rate me</Text>
        </Pressable>
        <Pressable
          className="p-2 border rounded-full border-sky-400 w-28"
          onPress={() =>
            setInput(
              "Can you give me some recommendations on what i could wear based on my style?"
            )
          }
        >
          <Text className="font-bold text-center text-sky-400">Recommend</Text>
        </Pressable>
        <Pressable
          className="p-2 border rounded-full border-sky-400 w-28"
          onPress={() =>
            setInput("How would i look like in a red Adidas tracksuit")
          }
        >
          <Text className="font-bold text-center text-sky-400">Try it on!</Text>
        </Pressable>
        <Pressable
          className="p-2 border rounded-full border-sky-400 w-28"
          onPress={() => setInput(getOcassionPrompt("formal"))}
        >
          <Text className="font-bold text-center text-sky-400">Formal</Text>
        </Pressable>
        <Pressable
          className="p-2 border rounded-full border-sky-400 w-28"
          onPress={() => setInput(getOcassionPrompt("casual"))}
        >
          <Text className="font-bold text-center text-sky-400">Casual</Text>
        </Pressable>
        <Pressable
          className="p-2 border rounded-full border-sky-400 w-28"
          onPress={() => setInput(getOcassionPrompt("party"))}
        >
          <Text className="font-bold text-center text-sky-400">Party</Text>
        </Pressable>
        <Pressable
          className="p-2 border rounded-full border-sky-400 w-28"
          onPress={() => setInput(getOcassionPrompt("work"))}
        >
          <Text className="font-bold text-center text-sky-400">Work</Text>
        </Pressable>
      </ScrollView>
      <View className="flex flex-row items-end p-3 gap-x-1">
        {/* Camera button */}
        <View className="shrink-0">
          <TouchableOpacity
            className="flex flex-row items-center justify-center bg-gray-50 border border-gray-200 rounded-full aspect-square h-[46px] gap-x-2"
            disabled={isLoading}
            onPress={openCamera}
          >
            <CameraIcon
              color={colors.sky[400]}
              size={16}
              className="w-12 h-12"
            />
          </TouchableOpacity>
        </View>

        {/* Text input field */}
        <View className="relative bg-white border border-gray-200 rounded-3xl grow basis-0">
          {image && (
            <Image
              className="w-20 h-20 mx-4 mt-4 rounded-2xl"
              source={{ uri: image }}
            />
          )}
          <ChatTextInput input={input} onInputChange={onInputChange} />
        </View>

        {/* Submit button */}
        <View className="shrink-0">
          <ChatSubmitButton
            isLoading={isLoading}
            isStreaming={isStreaming}
            input={input}
            handleSubmit={() => {
              if (image) {
                console.log(
                  "Saving image to local storage: ",
                  image?.slice(0, 40)
                );
                useImageStore.getState().setImage(image);
              }
              onSubmit(input, image);
              setImage(null);
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ChatInput;
