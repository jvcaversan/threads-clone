import { usePosts } from "@/src/api/posts";
import SafeAreaViewFixed from "@/src/components/SafeAreaViewFix";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";

interface Profile {
  name: string;
  photo?: string; // Adicionando foto do perfil
}

interface Post {
  id: string;
  post: string | null;
  created_at: string | null;
  profiles: Profile[];
}

export default function Home() {
  const { data: posts, error, isLoading, refetch, isFetching } = usePosts();
  const [newPost, setNewPost] = useState<string>("");

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color="black"
        className="flex-1 justify-center"
      />
    );
  }

  if (error) {
    return console.warn("Erro", error.message);
  }

  const sortedPosts = posts
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  return (
    <SafeAreaViewFixed className="mb-10 bg-white">
      <View className="py-4 border-b border-gray-300">
        <Text className="text-2xl font-bold text-center">Home</Text>
      </View>

      <FlatList
        data={sortedPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white rounded-lg shadow-md p-4 my-2">
            <View className="flex-row items-center mb-2">
              {/* <Image
                source={{
                  uri:
                    item.profiles?.[0]?.photo ||
                    "https://via.placeholder.com/40",
                }}
                className="w-10 h-10 rounded-full mr-2"
              /> */}
              <Text className="font-bold text-lg">
                {item.profiles ? item.profiles.name : "Anônimo"}
              </Text>
            </View>
            <Text className="text-base mb-2">{item.post}</Text>
            <Text className="text-sm text-gray-500">
              Criado em: {new Date(item.created_at).toLocaleString()}
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            colors={["#000"]}
            progressBackgroundColor="#fff"
          />
        }
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500">Nenhum post disponível.</Text>
          </View>
        }
      />
    </SafeAreaViewFixed>
  );
}
