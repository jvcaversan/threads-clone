import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
import { useUser } from "../context/AuthContext";
import { useTimeSincePost } from "../hooks/useTimeSincePost";

export default function PostItem({ post }: any) {
  const [likes, setLikes] = useState(false);
  const [retweets, setRetweets] = useState<{ [postId: string]: number }>({});

  const timeSincePost = useTimeSincePost(post.created_at);

  const user = useUser();

  const handleLike = () => {
    setLikes(!likes);
    console.log(user.id);
  };

  const handleRetweet = (postId: string) => {
    setRetweets((prevRetweets) => ({
      ...prevRetweets,
      [postId]: (prevRetweets[postId] || 0) + 1,
    }));
  };

  return (
    <View className="bg-white shadow-lg rounded-lg p-4 mx-4 mt-2">
      {/* Header */}
      <View className="flex-row mb-4">
        <Image
          source={{
            uri: post.profilePicture || "https://via.placeholder.com/48",
          }}
          className="w-12 h-12 rounded-full border border-gray-200 mr-4"
        />
        <View className="flex-1">
          <Text className="text-base font-semibold text-gray-900">
            {post.profiles ? post.profiles.name : "Anônimo"}
          </Text>
          <Text className="text-xs text-gray-500 mt-1">{timeSincePost}</Text>
        </View>
        <Ionicons name="ellipsis-horizontal" size={20} color="#9CA3AF" />
      </View>

      {/* Post Content */}
      <Text className="text-sm text-gray-800 mb-4 leading-6">{post.post}</Text>

      {/* Actions */}
      <View className="flex-row justify-between border-t border-gray-200 pt-3">
        {/* Likes */}
        <TouchableOpacity
          className="flex-row items-center space-x-2"
          onPress={handleLike}
        >
          <Ionicons
            name={likes ? "heart" : "heart-outline"}
            size={22}
            color={likes ? "red" : "#6B7280"}
          />
          <Text
            className={`text-sm ${likes ? "text-red-500" : "text-gray-600"}`}
          >
            {likes ? "1" : "0"}
          </Text>
        </TouchableOpacity>

        {/* Comments */}
        <TouchableOpacity className="flex-row items-center space-x-3">
          <Ionicons name="chatbubble-outline" size={22} color="#3B82F6" />
          <Text className="text-sm text-gray-600">Comentários</Text>
        </TouchableOpacity>

        {/* Retweets */}
        <TouchableOpacity
          className="flex-row items-center space-x-4"
          onPress={() => handleRetweet(post.id)}
        >
          <Ionicons name="repeat-outline" size={22} color="#10B981" />
          <Text className="text-sm text-gray-600">
            {retweets[post.id] || 0}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
