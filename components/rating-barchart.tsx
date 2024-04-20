import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import colors from "tailwindcss/colors";
import { LinearGradient } from "expo-linear-gradient";
import AnimatedNumbers from "react-native-animated-numbers";

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
    <View className="flex h-[240px] gap-y-2">
      <RatingBar label="🦄 Uniqueness" value={uniqueness} delay={200} />
      <RatingBar
        label="🎨 Color Coordination"
        value={colorCoordination}
        delay={400}
      />
      <RatingBar label="🕺 Fit" value={fit} delay={600} />
    </View>
  );
};

const RatingBar = ({
  label,
  value,
  delay,
}: {
  label: string;
  value: number;
  delay: number;
}) => {
  const [animateToNumber, setAnimateToNumber] = useState(0);
  const width = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: `${width.value}%`,
    };
  });

  useEffect(() => {
    width.value = withDelay(
      delay,
      withTiming((value / 10) * 100, {
        duration: 600,
        easing: Easing.inOut(Easing.ease),
      })
    );

    // update the animateToNumber value after a delay
    setTimeout(() => {
      setAnimateToNumber(value);
    }, delay);
  }, []);

  return (
    <View className="flex items-start w-full grow gap-y-2">
      <Text className="text-lg font-semibold text-sky-600">{label}</Text>
      <View className="relative flex items-start w-full overflow-hidden bg-gray-200 justify-stretch grow basis-0 rounded-xl">
        <Animated.View
          className="relative h-full overflow-hidden"
          style={animatedStyles}
        >
          <LinearGradient
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            colors={[colors.sky[300], colors.sky[500]]}
          />
          <AnimatedNumbers
            containerStyle={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              top: 0,
              bottom: 0,
              right: 10,
            }}
            fontStyle={{
              fontSize: 24,
              color: colors.white,
              fontWeight: "700",
            }}
            animateToNumber={animateToNumber}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default RatingBarchart;
