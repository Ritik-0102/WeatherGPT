import { create } from "zustand";
import { ChatMessage, VoiceState } from "@/types/chat";
import { INITIAL_MESSAGES, getMockResponse } from "@/lib/mock/chat";
import { VoiceService } from "@/lib/mobile/voice";

interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  voiceState: VoiceState;
  sendMessage: (text: string) => void;
  clearMessages: () => void;
  setFeedback: (id: string, feedback: "up" | "down") => void;
  setVoiceState: (state: VoiceState) => void;
  regenerateLastResponse: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: INITIAL_MESSAGES,
  isTyping: false,
  voiceState: "IDLE",

  sendMessage: (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const isVoiceMode = get().voiceState !== "IDLE";

    set((state) => ({
      messages: [...state.messages, userMsg],
      isTyping: true,
      voiceState: isVoiceMode ? "PROCESSING" : "IDLE",
    }));

    // Simulate AI response delay & streaming
    setTimeout(() => {
      const mock = getMockResponse(text);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: mock.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        richContent: mock.richContent,
      };

      if (isVoiceMode) {
        VoiceService.speak(mock.text);
        set((state) => ({
          messages: [...state.messages, aiMsg],
          isTyping: false,
          voiceState: "SPEAKING",
        }));

        // Stop speaking state after 5 seconds
        setTimeout(() => {
          if (get().voiceState === "SPEAKING") {
            set({ voiceState: "IDLE" });
          }
        }, 5000);
      } else {
        set((state) => ({
          messages: [...state.messages, aiMsg],
          isTyping: false,
        }));
      }
    }, 1200);
  },

  clearMessages: () => {
    VoiceService.stopSpeaking();
    set({ messages: INITIAL_MESSAGES, voiceState: "IDLE" });
  },

  setFeedback: (id: string, feedback: "up" | "down") => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, feedback: msg.feedback === feedback ? undefined : feedback } : msg
      ),
    }));
  },

  setVoiceState: (voiceState: VoiceState) => {
    if (voiceState === "IDLE") {
      VoiceService.stopSpeaking();
    }
    set({ voiceState });
  },

  regenerateLastResponse: () => {
    const { messages } = get();
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === "user");
    if (!lastUserMsg) return;

    set({ isTyping: true });
    setTimeout(() => {
      const mock = getMockResponse(lastUserMsg.text);
      const newAiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: mock.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        richContent: mock.richContent,
      };

      set((state) => ({
        messages: [...state.messages, newAiMsg],
        isTyping: false,
      }));
    }, 1000);
  },
}));
