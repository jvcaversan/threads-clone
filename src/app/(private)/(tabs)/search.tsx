import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PostItem from "@/src/components/PostItem";
import useSortedPosts from "@/src/hooks/useSortedPosts";
import SafeAreaViewFixed from "@/src/components/SafeAreaViewFix";
import { supabase } from "@/src/lib/supabase";

export default function SearchPosts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("posts")
      .select("*, profiles(name)")
      .ilike("post", `%${searchQuery}%`);

    if (error) {
      setError(error.message);
    }

    setSearchResults(data || []);
    setLoading(false);
    return data;
  };

  const sortedSearchResults = useSortedPosts(searchResults);

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <SafeAreaViewFixed className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="border-b border-gray-200 flex-row items-center bg-white">
        <Text className="flex-1 text-lg font-bold text-center text-black">
          Buscar Posts
        </Text>
      </View>

      {/* Search Bar */}
      <View className="p-4">
        <View className="flex-row items-center border border-gray-300 rounded-lg bg-gray-100 px-3">
          <Ionicons name="search-outline" size={20} color="gray" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar posts..."
            className="flex-1 p-3 text-black"
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClear}>
              <Ionicons name="close-circle" size={20} color="gray" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={handleSearch}
          className="bg-blue-500 p-3 mt-4 rounded-lg items-center"
        >
          <Text className="text-white font-bold">Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Results */}
      <View className="flex-1">
        {loading ? (
          <ActivityIndicator size="large" color="#1DA1F2" className="mt-4" />
        ) : error ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-red-500">{error}</Text>
          </View>
        ) : sortedSearchResults.length > 0 ? (
          <FlatList
            data={sortedSearchResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PostItem post={item} />}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500">Nenhum post encontrado.</Text>
          </View>
        )}
      </View>
    </SafeAreaViewFixed>
  );
}
