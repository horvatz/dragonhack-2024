import { View, Image, Text } from "react-native";
import { cn } from "../../utils/cn";
import React from "react";
import BubbleTail from "../bubble-tail";
import colors from "tailwindcss/colors";
import MarkdownDisplay from "../markdown-display";
import { ChatCompletionMessageParam } from "react-native-gen-ui";

interface ChatBubbleProps {
  message: ChatCompletionMessageParam;
}

const ChatBubble = ({ message }: ChatBubbleProps) => {
  if (!message.content) {
    return <Text>- Message content is empty -</Text>;
  }

  const getText = () => {
    const content = message.content;
    if (!content) return null;

    if (typeof content === "string") {
      return content;
    }

    if (content[0]?.type === "text") {
      return content[0].text;
    }

    if (content[1]?.type === "text") {
      return content[1].text;
    }
  };

  const getImage = () => {
    const content = message.content;
    if (!content || typeof content === "string") return null;

    if (content[0]?.type === "image_url") {
      return content[0].image_url.url;
    }

    if (content[1]?.type === "image_url") {
      return content[1].image_url.url;
    }
  };

  const text = getText();
  const image = getImage();

  return (
    <View
      className={cn(
        "relative rounded-3xl py-2 px-4",
        message.role === "user"
          ? "bg-sky-500 self-end ml-14"
          : "bg-[#E9E9EB] self-start mr-14"
      )}
    >
      {message.role === "user" ? (
        <View className="absolute -bottom-1 -right-1 -scale-x-100">
          <BubbleTail color={colors.sky[500]} />
        </View>
      ) : (
        <View className="absolute -bottom-1 -left-1">
          <BubbleTail color={"#E9E9EB"} />
        </View>
      )}
      <View className="flex flex-col">
        {image && (
          <Image
            className="self-end w-full my-2 rounded-2xl aspect-square"
            source={{ uri: image }}
          />
        )}
        {text && (
          <MarkdownDisplay
            textColor={message.role === "user" ? "white" : "black"}
          >
            {text}
          </MarkdownDisplay>
        )}
      </View>
    </View>
  );
};

export default ChatBubble;
