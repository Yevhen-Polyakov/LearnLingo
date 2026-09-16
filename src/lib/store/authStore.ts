import { create } from "zustand";
import type { User } from "firebase/auth";

type AuthStore = {
    isLoggedIn: boolean;
    currentUser: User | null;
    isInitialized: boolean;
    setAuth: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>()((set)=> ({
    isLoggedIn: false,
    currentUser: null,
    isInitialized: false,

    setAuth: (user) => set({
        currentUser: user,
        isLoggedIn: user !== null,
        isInitialized: true,
    })

}))