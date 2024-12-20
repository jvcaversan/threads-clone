import { useAuth } from "@/src/context/AuthContext";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function PrivateLayout() {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/(public)/signin"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
