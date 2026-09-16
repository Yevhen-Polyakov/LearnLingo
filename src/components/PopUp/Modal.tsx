import { useEffect } from "react";
import css from "./Modal.module.css"
import { createPortal } from "react-dom"

type Props = {
    children: React.ReactNode;
    onClose: ()=> void;
}

const Modal = ({children, onClose}: Props) => {

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget){
            onClose()
        }
    }

     useEffect(() => {

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [onClose])

    return createPortal(
        <div 
            className={css.backdrop}
            onClick={handleBackdropClick}
            aria-modal="true"
            role="dialog">

            <div className={css.modal}>
                <button 
                    className={css.closeButton}
                    aria-label="Close modal"
                    type="button"
                    onClick={onClose}>
                        &times;
                </button>
                {children}
                
            </div>

        </div>,
        document.body
    )
}

export default Modal