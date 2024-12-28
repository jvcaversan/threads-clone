import SafeAreaViewFixed from "@/src/components/SafeAreaViewFix";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  RefreshControl,
} from "react-native";
import React from "react";
import PostItem from "@/src/components/PostItem";
import useSortedPosts from "@/src/hooks/useSortedPosts";

export default function Home() {
  const { sortedPosts, error, isLoading, refetch, isFetching } =
    useSortedPosts();

  if (isLoading) {
    return (
      <SafeAreaViewFixed className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="black" />
      </SafeAreaViewFixed>
    );
  }

  if (error) {
    return (
      <SafeAreaViewFixed className="flex-1 bg-white justify-center items-center">
        <Text className="text-gray-500">Erro ao carregar os posts.</Text>
      </SafeAreaViewFixed>
    );
  }

  return (
    <SafeAreaViewFixed className="bg-white">
      <View className="border-b border-gray-300 bg-white px-4 py-3 items-center">
        <Text className="text-xl font-bold text-black">Início</Text>
      </View>

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
        contentContainerStyle={{ paddingBottom: 60 }} // Padding para evitar o botão fixo da tab bar
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
