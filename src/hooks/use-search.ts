"use client";

import { useState, useCallback, useEffect } from "react";
import { chatResponses, defaultResponse } from "@/data/chat-responses";
import type { RegulationSearchResult } from "@/types/chat";
import type { Country } from "@/types/ingredient";

export type SearchState = "idle" | "loading" | "results";

export interface SearchResult {
  ingredientName: string;
  inci: string;
  country: Country;
  status: RegulationSearchResult["status"];
  maxConcentration?: string;
  notes: string;
}

export function useSearch(externalQuery?: string) {
  const [query, setQuery] = useState(externalQuery ?? "");
  const [state, setState] = useState<SearchState>("idle");
  const [summary, setSummary] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [countryFilters, setCountryFilters] = useState<Country[]>([]);

  const search = useCallback((q: string) => {
    if (!q.trim()) return;
    setState("loading");
    setQuery(q);

    setTimeout(() => {
      const lower = q.toLowerCase();
      let found = defaultResponse;
      for (const [kw, resp] of Object.entries(chatResponses)) {
        if (lower.includes(kw.toLowerCase())) {
          found = resp;
          break;
        }
      }
      setSummary(found.text);
      setResults(found.results as SearchResult[]);
      setState("results");
    }, 1800);
  }, []);

  const reset = useCallback(() => {
    setState("idle");
    setQuery("");
    setSummary("");
    setResults([]);
    setCountryFilters([]);
  }, []);

  const toggleCountryFilter = useCallback((country: Country) => {
    setCountryFilters((prev) =>
      prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]
    );
  }, []);

  const filteredResults =
    countryFilters.length > 0
      ? results.filter((r) => countryFilters.includes(r.country))
      : results;

  // Sync external query for demo
  useEffect(() => {
    if (externalQuery !== undefined) setQuery(externalQuery);
  }, [externalQuery]);

  return {
    query,
    setQuery,
    state,
    summary,
    results: filteredResults,
    allResults: results,
    countryFilters,
    toggleCountryFilter,
    search,
    reset,
  };
}
