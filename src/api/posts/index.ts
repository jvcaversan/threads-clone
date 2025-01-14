import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";

import { supabase } from "@/src/lib/supabase";

export type PostType = {
  id: string;
  post: string | null;
  created_at: string | number | Date;
  profiles: {
    name: string | null;
  };
};

export const useCreatePost = () => {
  return useMutation({
    async mutationFn(data: any) {
      const { data: createPost, error } = await supabase
        .from("posts")
        .insert({
          post: data.post,
          user_id: data.user_id,
        })
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return createPost;
    },
  });
};

export const usePosts = (): UseQueryResult<
  {
    id: string;
    post: string | null;
    created_at: string | number | Date;
    profiles: { name: string | null };
  }[]
> => {
  return useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const { data, error } = await supabase.from("posts").select(`
        id,
        post,
        created_at,
        profiles (
          name
        )
      `);

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
