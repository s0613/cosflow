"use client";

import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useChat } from "@/hooks/use-chat";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { CountryFilterChips } from "./country-filter-chips";
import { RegulationResultCard } from "./regulation-result-card";
import type { Country } from "@/types/ingredient";
import type { RegulationSearchResult } from "@/types/chat";

export function RegulationChat() {
  const { messages, isTyping, sendMessage, activeCountryFilter, setActiveCountryFilter } =
    useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  function handleToggleCountry(country: Country) {
    setActiveCountryFilter((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  }

  const latestResults: RegulationSearchResult[] = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].results && messages[i].results!.length > 0) {
        return messages[i].results!;
      }
    }
    return [];
  })();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 h-[calc(100vh-220px)]">
      <Card className="flex flex-col py-0 gap-0 overflow-hidden">
        <ScrollArea className="flex-1" ref={scrollRef}>
          <div className="p-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex items-center gap-3 mb-4">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                </div>
                <div className="rounded-lg px-4 py-3 bg-muted text-sm text-muted-foreground">
                  규제 정보를 검색하고 있습니다...
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <CountryFilterChips
          activeFilters={activeCountryFilter}
          onToggle={handleToggleCountry}
        />
        <ChatInput onSend={sendMessage} disabled={isTyping} />
      </Card>

      <Card className="flex flex-col py-0 gap-0 overflow-hidden">
        <CardHeader className="border-b py-4">
          <CardTitle className="text-base">검색 결과 요약</CardTitle>
        </CardHeader>
        <ScrollArea className="flex-1">
          <CardContent className="p-4">
            {latestResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-sm text-muted-foreground">
                  성분명을 검색하면 국가별 규제 정보가 여기에 표시됩니다.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  총 {latestResults.length}건의 규제 정보
                </p>
                {latestResults.map((result, index) => (
                  <RegulationResultCard key={index} result={result} />
                ))}
              </div>
            )}
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}
