import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Feather, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useUser } from "@/src/context/AuthContext";
import { useProfile } from "@/src/api/profile";
import { useCreatePost } from "@/src/api/posts";
import { useState } from "react";
import PostIcons from "@/src/components/PostIcons";

export default function PostScreen() {
  const [post, setPost] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const user = useUser();
  const id = user.id;
  const { data: profile, isLoading, error } = useProfile(id);
  const { mutate: createPost } = useCreatePost();

  const handleCreatePost = () => {
    if (!post) {
      Alert.alert("Escreva alguma coisa para postar");
      return;
    }
    setIsPosting(true);
    createPost(
      {
        user_id: id,
        post,
      },

      {
        onSuccess: () => {
          setPost("");
          setIsPosting(false);
          router.replace("/home");
        },
        onError: (error) => {
          console.log(error?.message);
        },
      }
    );
  };

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
  return (
    <View className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCreatePost}
          disabled={isPosting}
          style={{ opacity: isPosting ? 0.5 : 1 }}
        >
          <Text className="black font-semibold">Postar</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row p-4 items-center">
        <Image
          source={{
            uri: profile.photo,
          }}
          className="w-12 h-12 rounded-full mr-2"
        />

        <View className="flex-column mb-5">
          <Text>{profile.name}</Text>

          <TextInput
            className="text-lg text-gray-800"
            placeholder="No que você está pensando?"
            value={post}
            onChangeText={setPost}
            placeholderTextColor="#A9A9A9"
            multiline
            numberOfLines={6}
            style={{ textAlignVertical: "top" }}
          />
        </View>
      </View>
      <PostIcons />
    </View>
  );
}
