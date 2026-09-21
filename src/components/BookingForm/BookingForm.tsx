import css from "../LoginForm/LoginForm.module.css"
import bookingCss from "./BookingForm.module.css"
import Button from "../Button/Button"
import * as  Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import type { Teacher } from "../../types/Type"
import toast from "react-hot-toast"

type Props ={
    teacher: Teacher;
}

type FormData = {
    name: string;
    email: string;
    phone: string;
    reason: string;
}

const booking = Yup.object().shape({
    name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(30, "Name is too long")
        .required("Name is required"),
    
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
        
    phone: Yup.string()
        .required("Phone is required"),
    
    reason: Yup.string()
        .required("Please select your reason for learning"),    
})

const BookingForm = ({teacher}:Props) => {

    const { register, handleSubmit, reset, formState: {errors},} = useForm({
        resolver: yupResolver(booking),
        defaultValues:{
            name: "",
            email: "",
            phone: "",
            reason: "Career and business",
        }
    })

    const onSubmit = (data: FormData) => {
         console.log(data);
        reset()
        toast.success("Trial lesson booked successfully!")  
    }

    return(
         <div className={`${css.login} ${bookingCss.bookingWrap}`}>
            <div className={css.loginText}>
                <h2 className={css.title}>Book a trial lesson</h2>
                <p className={css.paragraph}>Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your specific needs.</p>
            </div>

            <div className={bookingCss.user}>
                <img
                    className={bookingCss.userAvatar}
                    src={teacher.avatar_url}
                    alt={`${teacher.name} ${teacher.surname}`}
                />

                <div className={bookingCss.userInfo}>
                    <span className={bookingCss.userLabel}>Your teacher</span>
                    <p className={bookingCss.userName}>{teacher.name} {teacher.surname}</p>
                </div>
            </div>

            <h3 className={bookingCss.learning}>What is your main reason for learning {teacher.languages.join(", ")}?</h3>

            <form onSubmit={handleSubmit(onSubmit)} className={css.form}>

                <fieldset className={bookingCss.fieldset}>
                    {[
                        "Career and business",
                        "Lesson for kids",
                        "Living abroad",
                        "Exams and coursework",
                        "Culture, travel or hobby",
                    ].map((option) => (
                        <label key={option} className={bookingCss.label}>
                            <input
                                className={bookingCss.input}
                                type="radio"
                                value={option}
                                {...register("reason")}
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </fieldset>

                {errors.reason && (
                    <p className="error">{errors.reason.message}</p>
                )}
                
                <input
                    className={css.input} 
                    type="text"
                    placeholder="Full Name" 
                    {...register("name")}/>

                    {errors.name &&(
                        <p className="error">{errors.name.message}</p>
                    )}
                        
                <input 
                    className={css.input}
                    type="email" 
                    placeholder="Email"
                    {...register("email")}/>

                    {errors.email && (
                        <p className="error">{errors.email.message}</p>
                    )}

                <input 
                    className={`${css.input} ${css.marginBottom18}`}
                    type="tel"
                    placeholder="Phone number"
                    {...register("phone")}/>

                    {errors.phone && (
                        <p className="error">{errors.phone.message}</p>
                    )}

                <Button
                    variant="buttonForm"
                    type="submit"
                    aria-label="Booking">
                       Book 
                </Button>    
            </form>
        </div>
    )
}

export default BookingForm