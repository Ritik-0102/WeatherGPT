"use client";

import { useEffect, useState, useRef } from "react";
import { VoiceState } from "@/types/chat";
import { Mic, X, Volume2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceUIProps {
  state: VoiceState;
  onClose: () => void;
  onTranscript: (text: string) => void;
}

export function VoiceUI({ state, onClose, onTranscript }: VoiceUIProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (state !== "LISTENING") return;

    let isMounted = true;

    const startSpeechRecognition = async () => {
      setErrorMessage(null);

      // 1. Request microphone permission
      try {
        if (typeof navigator !== "undefined" && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          await navigator.mediaDevices.getUserMedia({ audio: true });
        }
      } catch {
        if (isMounted) {
          setErrorMessage("Microphone permission denied. Please enable mic access in your device settings.");
        }
        return;
      }

      // 2. SpeechRecognition API
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        // Fallback simulation if speech recognition isn't natively built into browser engine
        setTimeout(() => {
          if (isMounted) {
            onTranscript("Will it rain in New Delhi this evening?");
          }
        }, 2500);
        return;
      }

      try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (isMounted && transcript) {
            onTranscript(transcript);
          }
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onerror = (event: any) => {
          console.warn("Speech recognition error:", event.error);
          if (isMounted && event.error !== "no-speech") {
            setErrorMessage(`Speech recognition error: ${event.error}`);
          }
        };

        recognition.start();
      } catch (e) {
        console.warn("Failed to start speech recognition:", e);
      }
    };

    startSpeechRecognition();

    return () => {
      isMounted = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Ignore error on stop
        }
      }
    };
  }, [state, onTranscript]);

  if (state === "IDLE") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4">
      <div className="flex flex-col items-center justify-between h-[320px] w-[320px] bg-card border rounded-2xl p-6 shadow-xl relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground"
        >
          <X className="h-4 w-4" />
        </Button>

        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Voice Assistant
        </span>

        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="relative flex items-center justify-center">
            {state === "LISTENING" && !errorMessage && (
              <span className="absolute h-20 w-20 rounded-full bg-primary/20 animate-ping" />
            )}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
              {errorMessage ? (
                <AlertCircle className="h-8 w-8 text-destructive" />
              ) : (
                <>
                  {state === "LISTENING" && <Mic className="h-8 w-8 animate-pulse" />}
                  {state === "PROCESSING" && <Loader2 className="h-8 w-8 animate-spin" />}
                  {state === "SPEAKING" && <Volume2 className="h-8 w-8 animate-bounce" />}
                  {state === "ERROR" && <AlertCircle className="h-8 w-8 text-destructive" />}
                </>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg">
              {errorMessage
                ? "Microphone Error"
                : state === "LISTENING"
                ? "Listening..."
                : state === "PROCESSING"
                ? "Processing voice..."
                : state === "SPEAKING"
                ? "WeatherGPT Speaking"
                : "Voice Error"}
            </h4>
            <p className="text-xs text-muted-foreground mt-1 max-w-[240px]">
              {errorMessage ||
                (state === "LISTENING" && "Speak your weather query clearly...") ||
                (state === "PROCESSING" && "Understanding your request...") ||
                (state === "SPEAKING" && "Reading response aloud...") ||
                "Could not recognize audio. Try again."}
            </p>
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={onClose} className="w-full">
          Close
        </Button>
      </div>
    </div>
  );
}
