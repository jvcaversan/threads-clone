import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useUser } from "@/src/context/AuthContext";
import { useUpdateProfileById } from "@/src/api/profile";
import { router } from "expo-router";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const user = useUser();
  const id = user.id;

  const { mutate: updateProfile, error } = useUpdateProfileById();

  const handleSave = () => {
    updateProfile(
      {
        id,
        photo: "https://via.placeholder.com/150",
        name: name,
        bio,
        updated_at: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );

    if (error) {
      console.log(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 bg-gradient-to-b from-blue-50 to-blue-100 px-5 pt-8">
            <Text className="text-2xl font-semibold text-center text-gray-700">
              Editar Perfil
            </Text>

            <View className="items-center mt-6">
              <TouchableOpacity>
                <Image
                  source={{
                    uri: "https://via.placeholder.com/150",
                  }}
                  className="w-32 h-32 rounded-full border-4 black shadow-lg"
                />
                <View className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow">
                  <Ionicons name="camera" size={20} color="black" />
                </View>
              </TouchableOpacity>
              <Text className="black mt-3 text-sm font-medium">
                Alterar Foto
              </Text>
            </View>

            <View className="mt-1">
              <View className="mb-6">
                <Text className="text-gray-600 text-sm mb-2">Nome</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Digite seu nome"
                  className="bg-white rounded-lg px-4 py-3 shadow text-gray-700 items-center justify-center"
                />
              </View>

              <View className="mb-6">
                <Text className="text-gray-600 text-sm mb-2">Biografia</Text>
                <TextInput
                  value={bio}
                  onChangeText={setBio}
                  placeholder="Fale um pouco sobre você"
                  multiline
                  className="bg-white rounded-lg px-4 py-3 shadow text-gray-700 h-28 text-top"
                  style={{
                    textAlignVertical: "top",
                  }}
                />
              </View>
            </View>
          </View>
          <View className="mb-4 mx-6">
            {Platform.OS === "ios" ? (
              <TouchableOpacity
                onPress={handleSave}
                className="bg-black py-4 rounded-full items-center shadow-lg mb-10"
              >
                <Text className="text-white text-lg font-medium">
                  Salvar Alterações
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleSave}
                className="bg-black py-4 rounded-full items-center shadow-lg"
              >
                <Text className="text-white text-lg font-medium">
                  Salvar Alterações
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
