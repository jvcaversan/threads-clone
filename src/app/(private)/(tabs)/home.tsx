import { usePosts } from "@/src/api/posts";
import SafeAreaViewFixed from "@/src/components/SafeAreaViewFix";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
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
        style={{ flex: 1, justifyContent: "center" }}
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
    <SafeAreaViewFixed style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
      </View>

      <FlatList
        data={sortedPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <View style={styles.profileHeader}>
              {/* <Image
                source={{
                  uri:
                    item.profiles?.[0]?.photo ||
                    "https://via.placeholder.com/40",
                }}
                style={styles.profileImage}
              /> */}
              <Text style={styles.profileName}>
                {item.profiles ? item.profiles.name : "Anônimo"}
              </Text>
            </View>
            <Text style={styles.postText}>{item.post}</Text>
            <Text style={styles.postDate}>
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
          <View style={styles.emptyList}>
            <Text>Nenhum post disponível.</Text>
          </View>
        }
      />
    </SafeAreaViewFixed>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: -30,
  },
  header: {
    paddingVertical: 16,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  profileName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postText: {
    marginBottom: 8,
    fontSize: 16,
  },
  postDate: {
    color: "#555",
    fontSize: 12,
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
