import { CameraIcon } from "lucide-react-native";
import { Pressable, ScrollView, Text } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import ChatTextInput from "./chat-text-input";
import ChatSubmitButton from "./chat-submit-button";
import colors from "tailwindcss/colors";
import * as ImagePicker from "expo-image-picker";
import { getOcassionPrompt } from "../../utils/helpers";

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

  const openCamera = async () => {
    // No need to manually handle permissions with expo-image-picker
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0,
    });

    if (!result.canceled) {
      if (result.assets[0].base64) {
        // Set base64 of image
        const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
        console.log("Setting image");
        setImage(base64);
      }
    }
  };

  return (
    <View>
      <ScrollView
        className="h-12"
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="ml-4 flex flex-row justify-center items-center gap-x-2"
      >
        {/* Scrollable badges with fashion ocassions */}
        <Pressable
          className="bg-sky-500 rounded-full p-2 w-28"
          onPress={() => setInput(getOcassionPrompt("formal"))}
        >
          <Text className="text-center text-gray-50 font-bold">Formal</Text>
        </Pressable>
        <Pressable
          className="bg-sky-500 rounded-full p-2 w-28"
          onPress={() => setInput(getOcassionPrompt("casual"))}
        >
          <Text className="text-center text-gray-50 font-bold">Casual</Text>
        </Pressable>
        <Pressable
          className="bg-sky-500 rounded-full p-2 w-28"
          onPress={() => setInput(getOcassionPrompt("party"))}
        >
          <Text className="text-center text-gray-50 font-bold">Party</Text>
        </Pressable>
        <Pressable
          className="bg-sky-500 rounded-full p-2 w-28"
          onPress={() => setInput(getOcassionPrompt("work"))}
        >
          <Text className="text-center text-gray-50 font-bold">Work</Text>
        </Pressable>
      </ScrollView>
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
              className="w-12 h-12"
            />
          </TouchableOpacity>
        </View>

        {/* Text input field */}
        <View className="relative bg-white border border-gray-300 rounded-3xl grow basis-0">
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
