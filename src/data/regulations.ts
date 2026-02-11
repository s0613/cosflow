import type { CountryRegulation } from "@/types/ingredient";
import { ingredients } from "@/data/ingredients";

export interface FlatRegulationEntry extends CountryRegulation {
  ingredientId: string;
  ingredientNameKo: string;
  ingredientNameEn: string;
  inci: string;
  category: string;
}

export const regulations: FlatRegulationEntry[] = ingredients.flatMap((ingredient) =>
  ingredient.regulations.map((reg) => ({
    ...reg,
    ingredientId: ingredient.id,
    ingredientNameKo: ingredient.nameKo,
    ingredientNameEn: ingredient.nameEn,
    inci: ingredient.inci,
    category: ingredient.category,
  }))
);
