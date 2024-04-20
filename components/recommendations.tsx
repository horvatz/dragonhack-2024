import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ProductInternal } from "../utils/fetch-recommendations";
import AnimateIn from "./animate-in";
import { Image } from "expo-image";
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

  console.log(recommendations);

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
      className="relative overflow-hidden rounded-2xl"
    >
      <View className="flex h-full">
        <Text className="mb-4 text-xl font-semibold text-gray-800">
          Recommendations
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="relative -mx-6 grow"
          contentContainerStyle={{
            paddingHorizontal: 16,
          }}
        >
          {recommendations.map((item, index) => (
            <AnimateIn key={index} delay={200 + index * 100}>
              <View className="relative h-full flex mr-4 items-center rounded-2xl overflow-hidden w-[170px] bg-gray-200 gap-y-2">
                {/* Background Gradient */}
                <View className="relative w-full h-[120px] bg-gray-400">
                  <View className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-opacity-50">
                    <ImageOffIcon size={32} color={"white"} />
                  </View>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `https://${item.imageUrl}`,
                    }}
                    contentFit="cover"
                  />
                </View>
                <View className="relative flex flex-col items-start justify-start w-full text-black grow gap-y-2">
                  <View className="flex items-start justify-center px-4 py-2 gap-y-1">
                    <Text className="text-sm font-semibold">
                      {item.name.slice(0, 50)}...
                    </Text>
                    <Text className="truncate text-md">{item.brandName}</Text>
                    <Text className="text-sm text-gray-500 truncate">
                      {item.colour}
                    </Text>
                  </View>
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
                    start={[0, 1]}
                    end={[1, 0]}
                    colors={[colors.sky[300], colors.sky[400]]}
                  />
                  <ShoppingCart size={16} color={"white"} />
                  <Text className="font-bold text-white">Buy</Text>
                </TouchableOpacity>
              </View>
            </AnimateIn>
          ))}
        </ScrollView>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0553",
  },
});

export default Recommendations;
