"use client";

import { useState } from "react";
import { ChatMessage } from "@/types/chat";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CloudLightning, Copy, Check, ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react";
import { WeatherResponseCard } from "./RichResponse/WeatherResponseCard";
import { ForecastResponseCard } from "./RichResponse/ForecastResponseCard";
import { ComparisonResponseCard } from "./RichResponse/ComparisonResponseCard";
import { WeatherAdvisory } from "@/components/weather/WeatherAdvisory";

interface ChatMessageItemProps {
  message: ChatMessage;
  isLastAI: boolean;
  onFeedback: (id: string, feedback: "up" | "down") => void;
  onRegenerate: () => void;
}

export function ChatMessageItem({ message, isLastAI, onFeedback, onRegenerate }: ChatMessageItemProps) {
  const [copied, setCopied] = useState(false);
  const isAI = message.sender === "ai";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "flex w-full gap-3 p-4 md:px-6 transition-colors",
        isAI ? "bg-muted/30" : "bg-background"
      )}
    >
      <Avatar className="h-8 w-8 shrink-0">
        {isAI ? (
          <>
            <AvatarImage src="/weathergpt-bot.png" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              <CloudLightning className="h-4 w-4" />
            </AvatarFallback>
          </>
        ) : (
          <>
            <AvatarFallback className="bg-muted text-foreground">YOU</AvatarFallback>
          </>
        )}
      </Avatar>

      <div className="flex flex-1 flex-col gap-1 overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold">{isAI ? "WeatherGPT" : "You"}</span>
          <span className="text-[10px] text-muted-foreground">{message.timestamp}</span>
        </div>

        <div className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
          {message.text}
        </div>

        {/* Render Rich Cards */}
        {message.richContent && (
          <div className="mt-2">
            {message.richContent.type === "weather" && message.richContent.weatherData && (
              <WeatherResponseCard data={message.richContent.weatherData} />
            )}
            {message.richContent.type === "forecast" && message.richContent.forecastData && (
              <ForecastResponseCard data={message.richContent.forecastData} />
            )}
            {message.richContent.type === "comparison" && message.richContent.comparisonData && (
              <ComparisonResponseCard data={message.richContent.comparisonData} />
            )}
            {message.richContent.type === "advisory" && message.richContent.advisoryData && (
              <WeatherAdvisory advisory={message.richContent.advisoryData} />
            )}
          </div>
        )}

        {/* Action Controls for AI Messages */}
        {isAI && (
          <div className="mt-2 flex items-center gap-1 text-muted-foreground">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={handleCopy}
            >
              {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn("h-7 w-7", message.feedback === "up" && "text-green-500")}
              onClick={() => onFeedback(message.id, "up")}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn("h-7 w-7", message.feedback === "down" && "text-red-500")}
              onClick={() => onFeedback(message.id, "down")}
            >
              <ThumbsDown className="h-3.5 w-3.5" />
            </Button>

            {isLastAI && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                onClick={onRegenerate}
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
