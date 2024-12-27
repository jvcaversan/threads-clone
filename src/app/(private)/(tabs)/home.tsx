import SafeAreaViewFixed from "@/src/components/SafeAreaViewFix";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  RefreshControl,
} from "react-native";
import React from "react";
import { useUser } from "@/src/context/AuthContext";
import PostItem from "@/src/components/PostItem";
import useSortedPosts from "@/src/hooks/useSortedPosts";

export default function Home() {
  const { sortedPosts, error, isLoading, refetch, isFetching } =
    useSortedPosts();
  const user = useUser();

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
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Erro ao carregar os posts.</Text>
      </View>
    );
  }

  return (
    <SafeAreaViewFixed className="flex-1 bg-white">
      {/* Header */}
      <View className="border-b border-gray-300 p-4 bg-white">
        <Text className="text-xl font-bold text-center text-black">Início</Text>
      </View>

      {/* FlatList */}
      <FlatList
        data={sortedPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostItem post={item} />}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            colors={["#000"]}
            progressBackgroundColor="#fff"
          />
        }
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center mt-32">
            <Text className="text-gray-500 text-base">
              Nenhum post disponível.
            </Text>
          </View>
        }
      />
    </SafeAreaViewFixed>
  );
}
