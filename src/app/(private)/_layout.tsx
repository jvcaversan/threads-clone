import { useAuth } from "@/src/context/AuthContext";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function PrivateLayout() {
  const { session, loading } = useAuth();

  if (!session) {
    return <Redirect href={"/(public)/signin"} />;
  }
  if (loading) {
    return <ActivityIndicator size="large" color="green" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{ headerShown: false, presentation: "modal" }}
      />
      <Stack.Screen
        name="editprofile"
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack>
  );
}
