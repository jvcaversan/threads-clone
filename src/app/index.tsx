import { ActivityIndicator } from "react-native";

import { View } from "@/src/components/ui/view";
import { useAuth } from "../context/AuthContext";
import { Redirect } from "expo-router";

export default function Index() {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={"/(public)/signin"} />;
  }
  if (session) {
    return <Redirect href={"/(private)/(tabs)/home"} />;
  }
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <ActivityIndicator size={20} color="green" />
    </View>
  );
}
