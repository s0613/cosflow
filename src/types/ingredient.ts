export type Country = "KR" | "CN" | "JP" | "EU" | "VN";

export type RegulationStatus = "허용" | "제한" | "금지" | "미등록" | "조건부허용";

export interface CountryRegulation {
  country: Country;
  status: RegulationStatus;
  maxConcentration?: string;
  notes?: string;
  lastUpdated: string;
}

export interface Ingredient {
  id: string;
  nameKo: string;
  nameEn: string;
  inci: string;
  casNumber: string;
  category: string;
  regulations: CountryRegulation[];
  description: string;
}
