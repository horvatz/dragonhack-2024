import React from "react";
import { View, Text, Image } from "react-native";
import { ProductInternal } from "../utils/fetch-recommendations";

interface RecommendationsProps {
  recommendations: ProductInternal[];
}

const Recommendations = ({ recommendations }: RecommendationsProps) => {
  return (
    <View>
      <Text className="text-xl font-semibold text-gray-800">
        Recommendations
      </Text>
      <View className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {recommendations.map((recommendation, index) => (
          <Recommendation
            key={recommendation.name + index}
            recommendation={recommendation}
          />
        ))}
      </View>
    </View>
  );
};

const Recommendation = ({
  recommendation,
}: {
  recommendation: ProductInternal;
}) => {
  return (
    <View className="flex flex-col items-center gap-y-2">
      <View className="w-32 h-32">
        <Image
          source={{ uri: recommendation.imageUrl }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
      <Text className="text-sm font-semibold text-gray-800">
        {recommendation.name}
      </Text>
      <Text className="text-sm font-semibold text-gray-600">
        {recommendation.brandName}
      </Text>
    </View>
  );
};

export default Recommendations;
