import { create } from "zustand";
import { persist } from "zustand/middleware";


type FavoriteStore = {
    favoriteIds: string[];
    favoritesByUser: Record<string, string[]>;

    addFavorite: (id: string, uid: string)=> void;
    removeFavorite:(id: string, uid: string)=> void;
    loadFavorites: (uid: string) => void;
    clearFavorites: () => void;
     
}

export const useFavoriteStore = create<FavoriteStore>()(
    persist((set) => ({
        favoriteIds: [],
        favoritesByUser: {},

        addFavorite: (id, uid) => set((state) => {
            const currentFavorites = state.favoritesByUser[uid] ?? []

            if (currentFavorites.includes(id)) {
                return state;
            }

            const updatedFavorites = [...currentFavorites, id]

            return {
                favoriteIds: updatedFavorites,
                favoritesByUser: {
                    ...state.favoritesByUser,
                    [uid]: updatedFavorites
                }
            }
        }),

        removeFavorite: (id, uid) => set((state) => {
            const currentFavorites = state.favoritesByUser[uid] ?? []

            const updatedFavorites = currentFavorites.filter(
                (favoriteId) => favoriteId !== id
            )

            return {
                favoriteIds: updatedFavorites,
                favoritesByUser: {
                    ...state.favoritesByUser,
                    [uid]: updatedFavorites,
                }
            }
            
        }),

        loadFavorites:(uid) => set((state) => ({
            favoriteIds: state.favoritesByUser[uid] ?? []
        })),

        clearFavorites: () => set({ favoriteIds: [] })
        
    }),
        {
            name:'favorite-teachers',
        },

)) 