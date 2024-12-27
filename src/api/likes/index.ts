import { supabase } from "@/src/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCheckLike = (userId: string, postId: string) => {
  return useQuery({
    queryKey: ["like", userId, postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("likes")
        .select("*")
        .eq("post_id", postId)
        .eq("user_id", userId)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
