import { Stack } from "expo-router";
import "../../global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import AuthProvider from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <GluestackUIProvider mode="light">
        <Stack>
          <Stack.Screen name="(private)" options={{ headerShown: false }} />
          <Stack.Screen name="(public)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </GluestackUIProvider>
    </AuthProvider>
  );
}
