import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/src/lib/supabase";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { Link, router } from "expo-router";

export default function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      Alert.alert("Erro", error.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    router.replace("/(private)/(tabs)/home");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 justify-center px-6">
      <View className="bg-white rounded-lg shadow-md p-6">
        <Text className="text-2xl font-semibold text-center text-gray-800 mb-3">
          Criar Conta
        </Text>
        {errorMessage ? (
          <Text className="text-red-500 text-center mb-3">{errorMessage}</Text>
        ) : null}
        <TextInput
          placeholder="nome"
          value={name}
          onChangeText={setName}
          className="text-gray-800"
        />
        <TextInput
          placeholder="email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="text-gray-800"
        />

        <TextInput
          placeholder="senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="text-gray-800"
        />
        <Pressable
          disabled={loading}
          style={{
            width: "100%",
            padding: 2,
            minHeight: 40,
            borderRadius: 4,
            backgroundColor: loading ? "gray" : "blue",
          }}
          onPress={handleLogin}
        >
          <Text>{loading ? "Carregando..." : "Criar Conta"}</Text>
        </Pressable>

        <View className="mt-5 flex-row justify-center items-center">
          <Text className=" text-gray-500">Já possui conta? </Text>
          <Link href={"/(public)/signin"} asChild>
            <Pressable>
              <Text className="text-blue-500 underline">Efetuar Login</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
