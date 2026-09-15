"use client";

import { useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useChatStore } from "@/stores/useChatStore";
import { ChatMessageItem } from "@/components/chat/ChatMessageItem";
import { ChatInput } from "@/components/chat/ChatInput";
import { VoiceUI } from "@/components/chat/VoiceUI";
import { Button } from "@/components/ui/button";
import { Trash2, Sparkles, Loader2 } from "lucide-react";

const SUGGESTIONS = [
  "Will it rain today in New Delhi?",
  "How hot will tomorrow be?",
  "Should I travel tomorrow to Mumbai?",
  "Weather forecast for this weekend",
  "Compare Delhi and Mumbai weather",
];

function ChatContent() {
  const searchParams = useSearchParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isTyping,
    voiceState,
    sendMessage,
    clearMessages,
    setFeedback,
    setVoiceState,
    regenerateLastResponse,
  } = useChatStore();

  // Auto-send query parameter 'q'
  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      sendMessage(query);
    }
  }, [searchParams, sendMessage]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleVoiceTranscript = (text: string) => {
    setVoiceState("PROCESSING");
    setTimeout(() => {
      setVoiceState("IDLE");
      sendMessage(text);
    }, 1000);
  };

  const lastAIMessageId = [...messages].reverse().find((m) => m.sender === "ai")?.id;

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-background">
      {/* Chat Header Bar */}
      <div className="flex items-center justify-between border-b px-4 py-3 md:px-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h1 className="text-base font-semibold">WeatherGPT AI Assistant</h1>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={clearMessages}
          className="text-xs text-muted-foreground hover:text-destructive gap-1.5"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Clear Chat
        </Button>
      </div>

      {/* Messages Scroll Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col">
          {messages.map((msg) => (
            <ChatMessageItem
              key={msg.id}
              message={msg}
              isLastAI={msg.id === lastAIMessageId}
              onFeedback={setFeedback}
              onRegenerate={regenerateLastResponse}
            />
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 p-4 md:px-6 bg-muted/30 text-xs text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span>WeatherGPT is analyzing atmospheric data...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Prompt Suggestions (Show when only welcome message exists) */}
      {messages.length <= 1 && (
        <div className="p-4 md:px-6">
          <p className="text-xs font-semibold text-muted-foreground mb-2">Suggested Queries:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => sendMessage(suggestion)}
                className="text-xs rounded-full bg-card hover:bg-accent"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Sticky Bottom Input Bar */}
      <div className="border-t bg-background p-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <ChatInput
            onSend={sendMessage}
            onVoiceClick={() => setVoiceState("LISTENING")}
            disabled={isTyping}
          />
        </div>
      </div>

      {/* Voice UI Overlay */}
      <VoiceUI
        state={voiceState}
        onClose={() => setVoiceState("IDLE")}
        onTranscript={handleVoiceTranscript}
      />
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground">Loading Chat...</div>}>
      <ChatContent />
    </Suspense>
  );
}
