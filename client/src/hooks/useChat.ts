import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { ChatMessage } from "@/lib/types";

export function useChat(sessionId: string | null) {
  const queryClient = useQueryClient();

  const messagesQuery = useQuery({
    queryKey: ["/api/chat", sessionId],
    enabled: !!sessionId,
    refetchInterval: false,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      if (!sessionId) throw new Error("No session");
      
      const response = await apiRequest("POST", "/api/chat", {
        message,
        sessionId,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["/api/chat", sessionId] 
      });
    },
  });

  return {
    messages: messagesQuery.data || [],
    isLoading: messagesQuery.isLoading,
    sendMessage: sendMessageMutation.mutate,
    isSending: sendMessageMutation.isPending,
    error: sendMessageMutation.error,
  };
}
