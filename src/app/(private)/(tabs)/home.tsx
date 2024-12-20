import { Text } from "@/src/components/ui/text";
import { useAuth } from "@/src/context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { session } = useAuth();

  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <Text>Session:{session?.user.email}</Text>
    </SafeAreaView>
  );
}
