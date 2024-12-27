import { usePosts } from "@/src/api/posts";

export default function useSortedPosts() {
  const { data: posts, error, isLoading, refetch, isFetching } = usePosts();

  const sortedPosts =
    posts
      ?.slice()
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ) || [];

  return { sortedPosts, error, isLoading, refetch, isFetching };
}
