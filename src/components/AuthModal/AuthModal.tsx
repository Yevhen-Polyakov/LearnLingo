import Modal from "../PopUp/Modal"
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import BookingForm from "../BookingForm/BookingForm";
import type { Teacher } from "../../types/Type";


type Props = {
    mode: "login" | "register" | "booking"
    onClose: () => void;
    teacher?: Teacher;
    onSuccess:() => void
}

const AuthModal = ({mode, onClose, teacher, onSuccess }: Props) => {

    return(
        <Modal onClose={onClose}>
            {mode === "login" ? (
                <LoginForm onSuccess={onSuccess}/>
            ) : mode === "register" ? (
                <RegisterForm onSuccess={onSuccess}/>
            ) : (
                teacher && <BookingForm teacher={teacher}/>
            )}    
        </Modal>
    )
}

export default AuthModal