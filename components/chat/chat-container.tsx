import { RefreshCcw } from "lucide-react-native";
import React, { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

const ChatContainer = ({ children }: PropsWithChildren) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-1"
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View className="flex items-start justify-center w-full h-12 px-4">
        <Text className="text-xl font-bold text-gray-800">🧢 FashionBuddy</Text>
        <TouchableOpacity className="absolute right-4" onPress={() => {}}>
          <RefreshCcw size={18} color={colors.gray[400]} />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView behavior="padding" className="flex flex-1">
        {children}
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatContainer;
