import SafeAreaViewFixed from "@/src/components/SafeAreaViewFix";
import { Button } from "@/src/components/ui/button";
import { Text } from "@/src/components/ui/text";
import { supabase } from "@/src/lib/supabase";
import { Alert } from "react-native";

export default function Profile() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaViewFixed>
      <Text>Profile Screen</Text>
      <Button onPress={handleLogout} />
    </SafeAreaViewFixed>
  );
}
