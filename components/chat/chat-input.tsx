import { CameraIcon } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import ChatTextInput from "./chat-text-input";
import ChatSubmitButton from "./chat-submit-button";
import colors from "tailwindcss/colors";

interface ChatInputProps {
  input: string;
  isStreaming: boolean;
  isLoading: boolean;
  onInputChange: (text: string) => void;
  onCameraPress: () => void;
  onSubmit: (input: string) => void;
}

const ChatInput = ({
  input,
  isStreaming,
  isLoading,
  onCameraPress,
  onInputChange,
  onSubmit,
}: ChatInputProps) => {
  return (
    <View className="flex flex-row items-end p-3 gap-x-1">
      {/* Camera button */}
      <View className="shrink-0">
        <TouchableOpacity
          className="flex flex-row items-center justify-center bg-gray-50 border border-gray-200 rounded-full w-14 h-[46px] gap-x-2"
          disabled={isLoading}
          onPress={onCameraPress}
        >
          <CameraIcon color={colors.sky[500]} size={16} className="w-12 h-12" />
        </TouchableOpacity>
      </View>

      {/* Text input field */}
      <View className="grow basis-0">
        <ChatTextInput input={input} onInputChange={onInputChange} />
      </View>

      {/* Submit button */}
      <View className="shrink-0">
        <ChatSubmitButton
          isLoading={isLoading}
          isStreaming={isStreaming}
          input={input}
          handleSubmit={onSubmit}
        />
      </View>
    </View>
  );
};

export default ChatInput;
