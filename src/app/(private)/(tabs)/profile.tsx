import { useProfile } from "@/src/api/profile";
import SafeAreaViewFixed from "@/src/components/SafeAreaViewFix";
import { useUser } from "@/src/context/AuthContext";
import { supabase } from "@/src/lib/supabase";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

export default function Profile() {
  const user = useUser();

  const id = user.id;

  const { data: profile, isLoading, error } = useProfile(id);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (error) {
    Alert.alert("Erro", error.message);
    return null;
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Erro", error.message);
    }
  };

  const handleEditProfile = () => {
    router.push("/(private)/editprofile");
  };

  return (
    <SafeAreaViewFixed className="bg-gray-50 flex-1">
      <View className="flex-1 items-center px-6 pt-10">
        {/* Foto de Perfil */}
        <Image
          source={{
            uri: profile.photo || "https://via.placeholder.com/150",
          }}
          className="w-28 h-28 rounded-full border-2 black shadow-md"
        />

        {/* Nome e Bio */}
        <Text className="text-xl font-semibold text-gray-800 mt-4">
          {profile.name || "Nome do Usuário"}
        </Text>
        <Text className="text-sm text-gray-600 text-center mt-2">
          {profile.bio || "Adicione uma breve descrição sobre você."}
        </Text>

        {/* Ações */}
        <View className="mt-6 w-full space-y-4">
          <TouchableOpacity
            onPress={handleEditProfile}
            className="bg-black py-3 rounded-full items-center shadow-md"
          >
            <Text className="text-white font-medium">Editar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 py-3 rounded-full items-center shadow-md mt-10"
          >
            <Text className="text-white font-medium">Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaViewFixed>
  );
}
