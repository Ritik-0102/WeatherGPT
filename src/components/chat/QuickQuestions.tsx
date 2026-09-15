"use client";

import { useRouter } from "next/navigation";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const QUESTIONS = [
  "Will it rain today?",
  "How hot will tomorrow be?",
  "Should I travel tomorrow?",
  "Weather this weekend?",
  "Compare Delhi and Mumbai",
];

export function QuickQuestions() {
  const router = useRouter();

  const handleAsk = (question: string) => {
    router.push(`/chat?q=${encodeURIComponent(question)}`);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
        <Sparkles className="h-4 w-4 text-primary" />
        <span>Ask WeatherGPT AI</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {QUESTIONS.map((question) => (
          <Button
            key={question}
            variant="outline"
            size="sm"
            onClick={() => handleAsk(question)}
            className="rounded-full bg-card hover:bg-accent text-xs md:text-sm font-medium transition-all"
          >
            {question}
            <ArrowUpRight className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
          </Button>
        ))}
      </div>
    </div>
  );
}
