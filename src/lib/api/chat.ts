import { apiClient, USE_MOCK_DATA } from "./client";
import { ChatMessage, RichContent } from "@/types/chat";
import { getMockResponse } from "@/lib/mock/chat";
import { UserRole } from "@/types/auth";

export interface SendMessageResponse {
  message: string;
  richContent?: RichContent;
}

export const chatApi = {
  sendMessage: async (
    prompt: string,
    role: UserRole = "NORMAL_USER",
    history: ChatMessage[] = []
  ): Promise<SendMessageResponse> => {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const mock = getMockResponse(prompt);
      return {
        message: mock.text,
        richContent: mock.richContent,
      };
    }

    try {
      // 1. Detect Intent via Spring Boot LLM Controller
      const intentRes = await apiClient.post<{ intent: string; location: string }>(
        "/llm/intent",
        {
          speciality: role,
          past_messages: history.map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
          query: prompt,
        }
      );

      const intent = intentRes.data?.intent || "weather_query";

      // 2. Request AI Chat Response
      const chatRes = await apiClient.post<{ response: string }>("/llm/chat", {
        speciality: role,
        intent: intent,
        query: prompt,
        data: {},
      });

      const mockFallback = getMockResponse(prompt);

      return {
        message: chatRes.data?.response || mockFallback.text,
        richContent: mockFallback.richContent,
      };
    } catch {
      // Fallback to rich mock generator if Spring Boot / LLM service is offline
      await new Promise((resolve) => setTimeout(resolve, 600));
      const mock = getMockResponse(prompt);
      return {
        message: mock.text,
        richContent: mock.richContent,
      };
    }
  },
};
