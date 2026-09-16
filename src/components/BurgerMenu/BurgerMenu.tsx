import { Link } from "react-router-dom"
import css from "./BurgerMenu.module.css"
import { useEffect, useState } from "react"
import Button from "../Button/Button"
import { FaArrowRightToBracket } from "react-icons/fa6"

type Props = {
  onOpenLogin: () => void; 
  onOpenRegister: () => void;
  isLoggedIn: boolean;
  onLogout: () => void
}

const BurgerMenu = ({onOpenLogin, onOpenRegister, isLoggedIn, onLogout}: Props) => {
    const [isOpen, setIsOpen] = useState(false)

    const closeMenu = () => setIsOpen(false)

    useEffect(()=> {
      document.body.style.overflow = isOpen ? "hidden" : ""

      return ()=> {
        document.body.style.overflow = ""
      }
    }, [isOpen])

    return(
        <div className={css.wrapper}>
          <button
            className={`${css.burger} ${isOpen ? css.open : ""}`}
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>

          {isOpen && (
            <div className={css.menu}>
              <nav className={css.nav}>
                <ul className={css.linkList}>
                  
                  <li>
                    <Link to="/" onClick={closeMenu}>
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link to="/teachers" onClick={closeMenu}>
                      Teachers
                    </Link>
                  </li>

                  {isLoggedIn && (
                    <Link to="/favorites" onClick={closeMenu}>
                      Favorites
                    </Link>
                  )}
                </ul>

                <ul className={css.burgerAuthorizationList}>
                    <li className={css.burgerAuthorizationItem}>

                      {isLoggedIn ? (
                            <Button
                                variant="login"
                                type="button"
                                aria-label="Logout"
                                onClick={onLogout}>
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

                    <li>
                        <Button 
                            variant="register"
                            type="button" 
                            aria-label="Register"
                            onClick={onOpenRegister}>
                            Registration
                        </Button>
                    </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
    )
}

export default BurgerMenu