import { useMemo } from "react";

const useSortedPosts = (list) => {
  const sortedPosts = useMemo(() => {
    return (
      list
        ?.slice()
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ) || []
    );
  }, [list]);

  return sortedPosts;
};

export default useSortedPosts;
