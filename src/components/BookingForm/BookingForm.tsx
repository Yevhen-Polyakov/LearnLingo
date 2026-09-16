import css from "../LoginForm/LoginForm.module.css"
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
})

const BookingForm = ({teacher}:Props) => {

    const { register, handleSubmit, reset, formState: {errors},} = useForm({
        resolver: yupResolver(booking),
        defaultValues:{
            name: "",
            email: "",
            phone: "",
        }
    })

    const onSubmit = (data: FormData) => {
        console.log("Booking",{
           teacher:`${teacher.name} ${teacher.surname}`,  
           ...data,
        })
        reset()
        toast.success("Trial lesson booked successfully!")  
    }

    return(
         <div className={css.login}>
            <div className={css.loginText}>
                <h2 className={css.title}>Book a trial lesson</h2>
                <p className={css.paragraph}>Thank you for your interest in our platform! Please provide the following information to book a trial lesson with your chosen teacher.</p>
            </div>

              <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
                
                <input
                    className={css.input} 
                    type="text"
                    placeholder="Name" 
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
                    placeholder="Phone"
                    {...register("phone")}/>

                    {errors.phone && (
                        <p className="error">{errors.phone.message}</p>
                    )}

                <Button
                    variant="buttonForm"
                    type="submit"
                    aria-label="Booking">
                       Book trial lesson 
                </Button>    
            </form>
        </div>
    )
}

export default BookingForm