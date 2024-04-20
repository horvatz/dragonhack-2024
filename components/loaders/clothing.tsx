import { View } from "react-native";
import LottieView from "lottie-react-native";
import React from "react";
import ClothingLoading from "../../assets/loading/clothing.json";

const SearchingClothes = () => {
  return (
    <View className="w-32 h-16 -ml-5">
      <LottieView
        source={ClothingLoading}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
        }}
        autoPlay
        loop
      />
    </View>
  );
};

export default SearchingClothes;
