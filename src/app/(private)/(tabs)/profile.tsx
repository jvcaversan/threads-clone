import { Button } from "@/src/components/ui/button";
import { Text } from "@/src/components/ui/text";
import { supabase } from "@/src/lib/supabase";
import { A } from "@expo/html-elements";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView>
      <Text>Profile Screen</Text>
      <Button onPress={handleLogout} />
    </SafeAreaView>
  );
}
