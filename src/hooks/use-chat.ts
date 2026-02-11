"use client";

import { useState, useCallback } from "react";
import { ChatMessage, RegulationSearchResult } from "@/types/chat";
import { chatResponses, defaultResponse } from "@/data/chat-responses";
import { Country } from "@/types/ingredient";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "안녕하세요! COSFLOW 규제 검색 AI입니다. 성분명이나 규제 관련 질문을 입력해주세요.\n\n예시:\n- \"히알루론산 규제 현황 알려줘\"\n- \"레티놀 중국 수출 가능해?\"\n- \"나이아신아마이드 각 나라별 규제\"",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeCountryFilter, setActiveCountryFilter] = useState<Country[]>([]);

  const sendMessage = useCallback(
    (content: string) => {
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      const lowerContent = content.toLowerCase();
      let response: { text: string; results: RegulationSearchResult[] } =
        defaultResponse;
      for (const [keyword, resp] of Object.entries(chatResponses)) {
        if (lowerContent.includes(keyword.toLowerCase())) {
          response = resp;
          break;
        }
      }

      let filteredResults = response.results;
      if (activeCountryFilter.length > 0) {
        filteredResults = response.results.filter((r) =>
          activeCountryFilter.includes(r.country)
        );
      }

      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: response.text,
          timestamp: new Date().toISOString(),
          results: filteredResults,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 1500);
    },
    [activeCountryFilter]
  );

  return {
    messages,
    isTyping,
    sendMessage,
    activeCountryFilter,
    setActiveCountryFilter,
  };
}
