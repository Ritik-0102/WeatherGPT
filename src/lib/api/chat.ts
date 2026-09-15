import { apiClient, USE_MOCK_DATA } from "./client";
import { RichContent } from "@/types/chat";
import { getMockResponse } from "@/lib/mock/chat";
import { UserRole } from "@/types/auth";

export interface SendMessageResponse {
  message: string;
  richContent?: RichContent;
}

interface ChatControllerResponse {
  response: string;
  intent?: string;
  location?: string;
  requiredCapabilities?: string[];
}

export const chatApi = {
  sendMessage: async (
    prompt: string,
    role: UserRole = "NORMAL_USER"
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
      // Primary: Call Spring Boot ChatController POST /api/v1/chat
      const res = await apiClient.post<ChatControllerResponse>("/chat", {
        query: prompt,
      });

      const mockFallback = getMockResponse(prompt);

      return {
        message: res.data?.response || mockFallback.text,
        richContent: mockFallback.richContent,
      };
    } catch (err) {
      console.warn("Spring Boot ChatController call failed, trying LLM endpoint...", err);

      try {
        // Backup: Call LLM Controller POST /api/v1/llm/chat
        const llmRes = await apiClient.post<{ response: string }>("/llm/chat", {
          speciality: role,
          intent: "weather_query",
          query: prompt,
          data: {},
        });

        const mockFallback = getMockResponse(prompt);

        return {
          message: llmRes.data?.response || mockFallback.text,
          richContent: mockFallback.richContent,
        };
      } catch {
        // Fallback to rich mock generator if live backend is unreachable
        await new Promise((resolve) => setTimeout(resolve, 600));
        const mock = getMockResponse(prompt);
        return {
          message: mock.text,
          richContent: mock.richContent,
        };
      }
    }
  },
};
