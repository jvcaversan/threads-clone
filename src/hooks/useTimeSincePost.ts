import { useState, useEffect } from "react";

export function useTimeSincePost(createdAt: Date) {
  const [timeSincePost, setTimeSincePost] = useState("");

  useEffect(() => {
    const updateTimeSincePost = () => {
      const now = new Date();
      const postDate = new Date(
        new Date(createdAt).getTime() - 3 * 3600 * 1000
      ); // Subtrai 3 horas do created_at

      // Calcula a diferença em segundos
      const diffInSeconds = Math.floor(
        (now.getTime() - postDate.getTime()) / 1000
      );

      if (diffInSeconds < 60) {
        setTimeSincePost(`${diffInSeconds} segundos atrás`);
      } else if (diffInSeconds < 3600) {
        setTimeSincePost(`${Math.floor(diffInSeconds / 60)} minutos atrás`);
      } else if (diffInSeconds < 86400) {
        setTimeSincePost(`${Math.floor(diffInSeconds / 3600)} horas atrás`);
      } else {
        setTimeSincePost(`${Math.floor(diffInSeconds / 86400)} dias atrás`);
      }
    };

    updateTimeSincePost();
    const intervalId = setInterval(updateTimeSincePost, 60000); // Atualiza a cada 1 minuto

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
  }, [createdAt]); // Dependência para monitorar mudanças em `created_at`

  return timeSincePost;
}
