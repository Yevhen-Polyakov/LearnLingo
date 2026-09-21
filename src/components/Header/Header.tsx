import { FaArrowRightToBracket } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import css from "./Header.module.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Button from "../Button/Button";
import { useAuthStore } from "../../lib/store/authStore";
import { logoutUser } from "../../lib/api/authService";
import toast from "react-hot-toast";



type Props = {
    onOpenLogin: () => void;
    onOpenRegister: () => void;
};

const Header = ({ onOpenLogin, onOpenRegister }: Props) => {

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
 

    const handleLogout = async () => {
        try {
            await logoutUser()
                   
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "logout error")
        }
    };

  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.headerWrapper}>
            <Link 
                className={css.logo} 
                to={"/"}>
                <img src={logo} alt="School of the Future" />
                LearnLingo
            </Link>

            <nav className={css.nav}>
                <ul className={css.navList}>
                    <li className={css.navItem}>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li className={css.navItem}>
                        <Link to={"teachers"}>Teachers</Link>
                    </li>
                    {isLoggedIn ? (
                       <li className={css.navItem}>
                            <Link to={"favorites"}>Favorites</Link>
                       </li> 
                    ) : ""}
                </ul>

                <ul className={css.authorizationlist}>
                    <li>
                        {isLoggedIn ? (
                            <Button
                                variant="login"
                                type="button"
                                aria-label="Logout"
                                onClick={handleLogout}>
                                <FaArrowRightToBracket />
                                <span>Logout</span>

                            </Button>) : (
                            
                            <Button 
                                variant="login"
                                type="button" 
                                aria-label="Log in"
                                onClick={onOpenLogin}>
                                <FaArrowRightToBracket />
                                <span>Log in</span>
                            </Button>
                            
                        )}
                        
                    </li>

                    {!isLoggedIn && (
                        <li>
                            <Button 
                                variant="register"
                                type="button" 
                                aria-label="Register"
                                onClick={onOpenRegister}>
                                Registration
                            </Button>
                        </li>
                    )}
                </ul>

            </nav>

            <BurgerMenu 
                onOpenLogin={onOpenLogin} 
                onOpenRegister={onOpenRegister} 
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}/>
        </div>
      </div>
    </header>
  );
};

export default Header