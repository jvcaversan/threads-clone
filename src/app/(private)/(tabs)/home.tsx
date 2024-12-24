import { usePosts } from "@/src/api/posts";
import SafeAreaViewFixed from "@/src/components/SafeAreaViewFix";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

interface Profile {
  name: string;
}

interface Post {
  id: string;
  post: string | null;
  created_at: string | null;
  profiles: Profile[];
}

export default function Home() {
  const { data: posts, error, isLoading } = usePosts();

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color="black"
        className="items-center justify-center"
      />
    );
  }

  const sortedPosts = posts
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  return (
    <SafeAreaViewFixed className="flex-1">
      <FlatList
        data={sortedPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Autor: {item.profiles ? item.profiles.name : "Anônimo"}</Text>
            <Text>{item.post}</Text>
            <Text>Criado em: {new Date(item.created_at).toLocaleString()}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View>
            <Text>Nenhum post disponível.</Text>
          </View>
        }
      />
    </SafeAreaViewFixed>
  );
}
