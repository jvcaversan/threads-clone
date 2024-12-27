import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TouchableOpacity, Image } from "react-native";
import { Text, View } from "react-native";

export default function PostItem({ post }: any) {
  const [likes, setLikes] = useState(false);
  const [retweets, setRetweets] = useState<{ [postId: string]: number }>({});

  const handleLike = () => {
    setLikes(!likes);
  };

  const handleRetweet = (postId: string) => {
    setRetweets((prevRetweets) => ({
      ...prevRetweets,
      [postId]: (prevRetweets[postId] || 0) + 1,
    }));
  };

  return (
    <View className="flex-row p-4 border-b border-gray-200">
      <Image
        source={{
          uri: post.profilePicture || "https://via.placeholder.com/48",
        }}
        className="w-12 h-12 rounded-full mr-2"
      />
      <View className="flex-1">
        {/* Header do Post */}
        <View className="flex-row justify-between items-center mb-1">
          <Text className="font-bold text-base">
            {post.profiles ? post.profiles.name : "Anônimo"}
          </Text>
          <Text className="text-sm text-gray-500">
            {new Date(post.created_at).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
        {/* Conteúdo do Post */}
        <Text className="text-sm text-gray-800 mb-2">{post.post}</Text>

        {/* Ações do Post */}
        <View className="flex-row justify-between w-3/4 mt-2">
          <TouchableOpacity
            className="flex-row items-center space-x-1"
            onPress={handleLike}
          >
            <Ionicons
              name={likes ? "heart" : "heart-outline"}
              size={20}
              color={likes ? "red" : "gray"}
            />
            <Text
              className={`text-sm ${likes ? "text-red-500" : "text-gray-600"}`}
            >
              {likes ? "1" : "0"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center space-x-1">
            <Ionicons name="chatbubble-outline" size={20} color="blue" />
            <Text className="text-sm text-gray-600">Comentários</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center space-x-1"
            onPress={() => handleRetweet(post.id)}
          >
            <Ionicons name="repeat-outline" size={20} color="green" />
            <Text className="text-sm text-gray-600">
              {retweets[post.id] || 0}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
