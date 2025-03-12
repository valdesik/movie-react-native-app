import { Text, View } from "react-native";
import {Link} from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className='text-4xl text-primary font-bold'>Welcome to fish-app</Text>
    </View>
  );
}
