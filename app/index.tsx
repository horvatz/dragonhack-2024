import { FlatList } from "react-native";
import { OpenAI, useChat } from "react-native-gen-ui";
import { z } from "zod";
import SearchingClothes from "../components/loaders/weather";
import React from "react";
import ChatContainer from "../components/chat/chat-container";
import ChatMessage from "../components/chat/chat-message";
import { systemPrompt } from "../utils/constants";
import ChatInput from "../components/chat/chat-input";
import RatingBarchart from "../components/rating-barchart";
import Recommendations from "../components/recommendations";
import { fetchRecommendations } from "../utils/fetch-recommendations";

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
    ],
    onError: (error) => {
      console.error("Error while streaming:", error);
    },
    onSuccess: () => {
      console.log("✅ Streaming done!");
    },
    tools: {
      showClothesRating: {
        description:
          "Show a chart of the ratings of the users clothes based on your opinion.",
        parameters: z.object({
          uniqueness: z.number(),
          colorCoordination: z.number(),
          fit: z.number(),
        }),
        render: (params) => {
          return {
            component: (
              <RatingBarchart
                uniqueness={params.uniqueness}
                colorCoordination={params.colorCoordination}
                fit={params.fit}
              />
            ),
            data: params,
          };
        },
      },
      showClothingRecommendation: {
        description: "Show a recommendation for the user's clothing.",
        parameters: z.object({
          searchQuery: z.string(),
        }),
        render: async function* (args) {
          yield <SearchingClothes />;

          const clothingRecommendation = await fetchRecommendations(
            args.searchQuery
          );

          return {
            component: (
              <Recommendations recommendations={clothingRecommendation} />
            ),
            data: clothingRecommendation,
          };
        },
      },
    },
  });

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
        onInputChange={onInputChange}
        onSubmit={(msg: string, image: string | null) => {
          if (image) {
            handleSubmit([
              {
                type: "image_url",
                image_url: {
                  url: image,
                },
              },
              {
                type: "text",
                text: msg,
              },
            ]);
          } else {
            handleSubmit(msg);
          }
        }}
      />
    </ChatContainer>
  );
}
