import type { Country, RegulationStatus } from "@/types/ingredient";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  results?: RegulationSearchResult[];
}

export interface RegulationSearchResult {
  ingredientName: string;
  inci: string;
  country: Country;
  status: RegulationStatus;
  maxConcentration?: string;
  notes: string;
}
