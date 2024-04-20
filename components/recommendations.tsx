import React, { useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { ProductInternal } from "../utils/fetch-recommendations";
import AnimateIn from "./animate-in";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import colors from "tailwindcss/colors";
import { ImageOffIcon, ShoppingCart } from "lucide-react-native";

interface RecommendationsProps {
  recommendations: ProductInternal[];
}

const Recommendations = ({ recommendations }: RecommendationsProps) => {
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      height: height.value,
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 150,
      easing: Easing.inOut(Easing.ease),
    });
    height.value = withTiming(350, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  }, []);

  return (
    <Animated.View
      style={animatedStyles}
      className="relative px-6 overflow-hidden rounded-2xl"
    >
      {/* Header */}
      <View className="flex flex-row items-center justify-between">
        <Text className="text-xl text-white max-w-[200px] truncate text-nowrap"></Text>
        <Text className="text-xl text-white capitalize">{}</Text>
      </View>
      <View>
        <Text className="mb-4 text-xl font-semibold text-gray-800">
          Recommendations
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="-mx-6"
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
        >
          {recommendations.map((item, index) => (
            <AnimateIn key={index} delay={200 + index * 100}>
              <View className="relative flex mr-4 items-center rounded-2xl overflow-hidden justify-between w-[150px] bg-gray-200 gap-y-2">
                {/* Background Gradient */}
                <View className="w-full h-[120px] bg-gray-400">
                  <View className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-opacity-50">
                    <ImageOffIcon size={32} color={"white"} />
                  </View>
                  <Image
                    source={{ uri: item.imageUrl }}
                    className="object-cover w-full h-full"
                  />
                </View>
                <View className="relative flex flex-col items-center justify-center w-full text-black gap-y-2">
                  <View className="flex items-start justify-center px-4 py-2 gap-y-1">
                    <Text className="text-sm font-semibold">
                      {item.name.slice(0, 50)}...
                    </Text>
                    <Text className="truncate text-md">{item.brandName}</Text>
                    <Text className="text-sm text-gray-500 truncate">
                      {item.colour}
                    </Text>
                  </View>
                  <TouchableOpacity className="relative flex flex-row items-center justify-center w-full h-10 gap-x-2">
                    <LinearGradient
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                      }}
                      colors={[colors.sky[300], colors.sky[400]]}
                    />
                    <ShoppingCart size={16} color={"white"} />
                    <Text className="font-bold text-white">Buy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </AnimateIn>
          ))}
        </ScrollView>
      </View>
    </Animated.View>
  );
};

export default Recommendations;
