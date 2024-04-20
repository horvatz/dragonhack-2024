import React from "react";
import { View, Text } from "react-native";

interface RatingBarchartProps {
  uniqueness: number;
  colorCoordination: number;
  fit: number;
}

const RatingBarchart = ({
  uniqueness,
  colorCoordination,
  fit,
}: RatingBarchartProps) => {
  return (
    <View className="flex flex-col gap-y-2">
      <RatingBar label="Uniqueness" value={uniqueness} />
      <RatingBar label="Color Coordination" value={colorCoordination} />
      <RatingBar label="Fit" value={fit} />
    </View>
  );
};

const RatingBar = ({ label, value }: { label: string; value: number }) => {
  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row items-center">
        <View
          className="w-4 h-4 bg-gray-200 rounded-full"
          style={{ width: `${value * 10}%` }}
        />
        <Text className="ml-2 text-sm font-semibold text-gray-600">
          {label}
        </Text>
      </View>
      <Text className="text-sm font-semibold text-gray-600">{value}</Text>
    </View>
  );
};

export default RatingBarchart;
