import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
import { useUser } from "../context/AuthContext";
import { useTimeSincePost } from "../hooks/useTimeSincePost";
import { supabase } from "../lib/supabase";

export default function PostItem({ post }: any) {
  const [likes, setLikes] = useState(false);
  const [likeRecord, setLikeRecord] = useState<{ id: string } | null>(null);
  const [retweets, setRetweets] = useState<{ [postId: string]: number }>({});

  const timeSincePost = useTimeSincePost(post.created_at);
  const user = useUser();

  useEffect(() => {
    const fetchLike = async () => {
      const { data } = await supabase
        .from("likes")
        .select("*")
        .eq("user_id", user.id)
        .eq("post_id", post.id);

      if (data && data.length > 0) {
        setLikeRecord(data[0]);
        setLikes(true);
      }
    };

    fetchLike();
  }, []);

  useEffect(() => {
    if (likes) {
      saveLike();
    } else {
      deleteLike();
    }
  }, [likes]);

  const saveLike = async () => {
    if (likeRecord) {
      return;
    }
    const { data } = await supabase
      .from("likes")
      .insert([
        {
          user_id: user.id,
          post_id: post.id,
        },
      ])
      .select();

    if (data && data.length > 0) {
      setLikeRecord(data[0]);
    }
  };

  const deleteLike = async () => {
    if (likeRecord) {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("id", likeRecord!.id);
      if (!error) {
        setLikeRecord(null);
      }
    }
  };

  const handleRetweet = (postId: string) => {
    setRetweets((prevRetweets) => ({
      ...prevRetweets,
      [postId]: (prevRetweets[postId] || 0) + 1,
    }));
  };

  return (
    <View className="bg-white shadow-lg rounded-lg p-2 mt-2">
      {/* Header */}
      <View className="flex-row mb-4 gap-2">
        <Image
          source={{
            uri: post.profilePicture || "https://via.placeholder.com/48",
          }}
          className="w-12 h-12 rounded-full border border-gray-200"
        />
        <View className="justify-between flex-1">
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
        <TouchableOpacity className="flex-row items-center space-x-2">
          <Ionicons
            onPress={() => setLikes(!likes)}
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
