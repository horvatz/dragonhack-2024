import { Platform, TextInput } from "react-native";
import { cn } from "../../utils/cn";
import React from "react";

interface ChatTextInputProps {
  input: string;
  onInputChange: (text: string) => void;
}

const ChatTextInput = ({ input, onInputChange }: ChatTextInputProps) => {
  return (
    <TextInput
      className={cn(
        Platform.OS === "ios" ? "py-4 min-h-[46px]" : "py-2 min-h-[44px]",
        "px-5"
      )}
      multiline
      value={input}
      inputMode="text"
      verticalAlign="middle"
      textAlignVertical="center"
      onChangeText={onInputChange}
      placeholder="Type a message..."
    />
  );
};

export default ChatTextInput;
