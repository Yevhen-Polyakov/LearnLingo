import { create } from "zustand";

type FilterStore = {
    language: string;
    level: string;
    price: string;

    setLanguage: (language:string) => void;
    setLevel: (Level: string) => void;
    setPrice: (Price: string) => void;

    clearFilters: () => void;
}

export const useFilterStore = create<FilterStore>()((set) => ({
    language: "",
    level: "",
    price: "",

    setLanguage: (language) => set({language}),
    setLevel: (level) => set({level}),
    setPrice: (price) => set({price}),

    clearFilters: () =>
    set({
      language: "",
      level: "",
      price: "",
    }),

}))
