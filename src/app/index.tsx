import { ActivityIndicator } from "react-native";
import { useAuth } from "../context/AuthContext";
import { Redirect } from "expo-router";

export default function Index() {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator size="large" color="green" />;
  }

  if (session) {
    return <Redirect href={"/(private)/(tabs)/home"} />;
  }
  if (!session) {
    return <Redirect href={"/(public)/signin"} />;
  }
}
