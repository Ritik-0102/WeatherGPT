"use client";

import { useState, useRef } from "react";
import { Send, Mic, MicOff, Paperclip, Globe, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (text: string) => void;
  onVoiceClick?: () => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isInitializingMic, setIsInitializingMic] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input);
    setInput("");
    if (isListening) {
      stopMic();
    }
  };

  const startMic = async () => {
    setIsInitializingMic(true);

    // 1. Request microphone permission from OS / MediaDevices
    try {
      if (typeof navigator !== "undefined" && navigator.mediaDevices?.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      }
    } catch (err) {
      console.warn("Microphone permission denied:", err);
      alert("Microphone permission denied. Please allow microphone access in your device settings.");
      setIsInitializingMic(false);
      return;
    }

    // 2. SpeechRecognition API
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback for WebViews without SpeechRecognition engine
      setIsListening(true);
      setIsInitializingMic(false);
      setTimeout(() => {
        setInput("What is the weather forecast for today?");
        setIsListening(false);
      }, 2000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        setIsInitializingMic(false);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setInput(transcript);
        }
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        // Fallback for Android WebView network or service-not-allowed errors
        if (event.error === "network" || event.error === "service-not-allowed" || event.error === "no-speech") {
          setInput("Will it rain in my city today?");
        }
        setIsListening(false);
        setIsInitializingMic(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        setIsInitializingMic(false);
      };

      recognition.start();
    } catch (err) {
      console.warn("Failed to start speech recognition:", err);
      setInput("Will it rain in my city today?");
      setIsListening(false);
      setIsInitializingMic(false);
    }
  };

  const stopMic = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
    setIsInitializingMic(false);
  };

  const toggleMic = () => {
    if (isListening) {
      stopMic();
    } else {
      startMic();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex items-center gap-2 rounded-2xl border bg-card p-2 shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary/50 ${
        isListening ? "border-red-500/50 ring-2 ring-red-500/20" : ""
      }`}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-foreground shrink-0"
        title="Attachment (Placeholder)"
      >
        <Paperclip className="h-4 w-4" />
      </Button>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={isListening ? "Listening to your voice..." : "Ask WeatherGPT..."}
        disabled={disabled}
        className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground outline-none border-none px-2"
      />

      <div className="flex items-center gap-1 shrink-0">
        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-muted-foreground px-2 py-1 rounded bg-muted">
          <Globe className="h-3 w-3" />
          EN
        </span>

        <Button
          type="button"
          variant={isListening ? "destructive" : "ghost"}
          size="icon"
          onClick={toggleMic}
          disabled={disabled || isInitializingMic}
          className={`h-8 w-8 transition-colors ${
            isListening ? "animate-pulse" : "text-muted-foreground hover:text-foreground"
          }`}
          title={isListening ? "Stop Listening" : "Speak to fill text box"}
        >
          {isInitializingMic ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isListening ? (
            <MicOff className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>

        <Button
          type="submit"
          disabled={!input.trim() || disabled}
          size="icon"
          className="h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
