import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/src/lib/supabase";
import { View, TouchableOpacity, Pressable } from "react-native";
import { Text } from "@/src/components/ui/text";
import { Input, InputField } from "@/src/components/ui/input";
import { Button, ButtonText } from "@/src/components/ui/button";
import { AntDesign } from "@expo/vector-icons"; // Para ícones do Google
import { Ionicons } from "@expo/vector-icons"; // Para ícones do Apple
import { Link, router } from "expo-router";

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
      setErrorMessage("Email ou Senha inválidos");
      return;
    }
    setLoading(false);
    router.replace("/(private)/(tabs)/home");
  };

  const handleGoogleLogin = () => {
    console.log("Google Login");
    // Adicione lógica para login com Google aqui
  };

  const handleAppleLogin = () => {
    console.log("Apple Login");
    // Adicione lógica para login com Apple aqui
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 justify-center px-6">
      <View className="bg-white rounded-lg shadow-md p-6">
        <Text className="text-2xl font-semibold text-center text-gray-800 mb-3">
          Fazer Login
        </Text>
        {errorMessage ? (
          <Text className="text-red-500 text-center mb-3">{errorMessage}</Text>
        ) : null}
        <Input variant="outline" size="md" className="mb-4">
          <InputField
            placeholder="email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="text-gray-800"
          />
        </Input>
        <Input variant="outline" size="md" className="mb-4">
          <InputField
            placeholder="senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="text-gray-800"
          />
        </Input>
        <Button
          onPress={handleLogin}
          isDisabled={loading}
          className={`w-full py-2 min-h-[40px] rounded-md ${
            loading ? "bg-gray-400" : "bg-blue-500"
          } flex justify-center items-center`}
        >
          <ButtonText className="text-white text-lg">
            {loading ? "Loading..." : "Login"}
          </ButtonText>
        </Button>
        <View className="flex-row justify-between items-center mt-6">
          <View className="h-[1px] bg-gray-300 flex-1"></View>
          <Text className="px-4 text-gray-500">OU</Text>
          <View className="h-[1px] bg-gray-300 flex-1"></View>
        </View>
        <View className="flex-row justify-center items-center gap-5 mt-6 mb-2">
          <TouchableOpacity
            onPress={handleGoogleLogin}
            className="w-12 h-12 rounded-full bg-white border border-gray-300 justify-center items-center"
          >
            <AntDesign name="google" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAppleLogin}
            className="w-12 h-12 rounded-full bg-black justify-center items-center"
          >
            <Ionicons name="logo-apple" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View className="mt-5 flex-row justify-center items-center">
          <Text className="text-gray-500">Não possui conta? </Text>
          <Link href={"/(public)/signup"} asChild>
            <Pressable>
              <Text className="text-blue-500 underline">Criar Conta</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
