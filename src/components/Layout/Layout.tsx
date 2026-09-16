import { Outlet } from "react-router-dom"
import { useLocation } from "react-router-dom"
import Header from "../Header/Header"
import { useEffect, useState } from "react"
import AuthModal from "../AuthModal/AuthModal"
import type { Teacher } from "../../types/Type"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "../../lib/store/authStore"
import { auth } from "../../lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useFavoriteStore } from "../../lib/store/favoriteStore"

type AuthMode = "login" | "register" | "booking"

export type OutletContext = {
    openBooking: (teacher: Teacher)=> void;
}

const Layout = () => {
    const setAuth = useAuthStore((state) => state.setAuth)
    const loadFavorites = useFavoriteStore((state) => state.loadFavorites)
    const clearFavorites = useFavoriteStore((state) => state.clearFavorites)

    const { pathname } = useLocation()
    const [authMode, setAuthMode] = useState<AuthMode | null>(null)
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)

    const isHomePage = pathname === "/Home" || pathname === "/"

    const openLogin = () => setAuthMode("login")
    const openRegister = () => setAuthMode("register")
    const closeModal = () => setAuthMode(null)

    const openBooking = (teacher: Teacher) => {
        setSelectedTeacher(teacher)
        setAuthMode("booking")
    }

   useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuth(user)

            if(user) {
                loadFavorites(user.uid)
            } else {
                clearFavorites()
            }
        })

        return unsubscribe
        
    }, [setAuth, loadFavorites, clearFavorites])


    return(
        <>
            <Toaster position="top-right" containerStyle={{zIndex: 9999}}/>
            {isHomePage && (
                <Header onOpenLogin={openLogin} onOpenRegister={openRegister} />
            )}
            <main>
                <Outlet context={{ openBooking } satisfies OutletContext} />
            </main>
            {authMode && 
                <AuthModal 
                    mode={authMode} 
                    onClose={closeModal} 
                    teacher={selectedTeacher ?? undefined}
                    onSuccess={closeModal}/>}
        </>
    )
}

export default Layout