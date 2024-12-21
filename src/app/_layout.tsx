import { Stack } from "expo-router";
import "../../global.css";
import AuthProvider from "../context/AuthContext";
import QueryProvider from "../context/QueryContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <QueryProvider>
        <Stack>
          <Stack.Screen name="(private)" options={{ headerShown: false }} />
          <Stack.Screen name="(public)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </QueryProvider>
    </AuthProvider>
  );
}
