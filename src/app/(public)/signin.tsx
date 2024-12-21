import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { supabase } from "@/src/lib/supabase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMessage("Email ou senha inválidos");
      return;
    }

    router.replace("/(private)/(tabs)/home");
  };

  const handleSocialLogin = (platform: any) => {
    console.log(`${platform} Login`);
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-black/50">
      <View className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <Text className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Bem-vindo de Volta!
        </Text>
        {errorMessage && (
          <Text className="text-red-500 text-center mb-4">{errorMessage}</Text>
        )}
        <View className="space-y-4 gap-3">
          <TextInput
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="w-full p-4 bg-gray-100 rounded-lg text-gray-800"
            placeholderTextColor="#9CA3AF"
          />
          <TextInput
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="w-full p-4 bg-gray-100 rounded-lg text-gray-800"
            placeholderTextColor="#9CA3AF"
          />
          <Pressable
            disabled={loading}
            onPress={handleLogin}
            className={`w-full py-3 rounded-lg ${
              loading ? "bg-gray-400" : "bg-blue-600"
            }`}
          >
            <Text className="text-center text-white font-semibold">
              {loading ? "Entrando..." : "Entrar"}
            </Text>
          </Pressable>
        </View>

        <TouchableOpacity className="mt-4">
          <Text className="text-sm text-blue-600 text-center font-medium">
            Esqueceu sua senha?
          </Text>
        </TouchableOpacity>

        <View className="flex-row items-center my-6">
          <View className="h-[1px] bg-gray-300 flex-1"></View>
          <Text className="px-4 text-gray-500">Ou continue com</Text>
          <View className="h-[1px] bg-gray-300 flex-1"></View>
        </View>

        <View className="flex-row justify-center gap-4">
          <TouchableOpacity
            onPress={() => handleSocialLogin("Google")}
            className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center shadow-sm"
          >
            <AntDesign name="google" size={24} color="#EA4335" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSocialLogin("Apple")}
            className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-sm"
          >
            <Ionicons name="logo-apple" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View className="mt-6 flex-row justify-center">
          <Text className="text-gray-500">Não possui uma conta? </Text>
          <Link href={"/(public)/signup"} asChild>
            <Pressable>
              <Text className="text-blue-600 font-semibold underline">
                Cadastre-se
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
