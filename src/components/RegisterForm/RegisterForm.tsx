import css from "../LoginForm/LoginForm.module.css"
import Button from "../Button/Button"
import * as  Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { FiEyeOff } from "react-icons/fi"
import toast from "react-hot-toast"
import { registerUser } from "../../lib/api/authService"

const registerSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(30, "Name is too long")
        .required(),
    
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
        
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required")
})

type Props = {
    onSuccess: () => void;
}

type FormRegister = {
    name: string;
    email: string;
    password: string;
}

const RegisterForm = ({onSuccess}: Props) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormRegister>({ resolver: yupResolver(registerSchema)})

    const onSubmit = async (data: FormRegister) => {
        try{
            const user = await registerUser(
                data.email, 
                data.password, 
                data.name)

            console.log("User", user)

            reset()
            toast.success("Registration successful!")
            onSuccess()
            
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Registration error")
        }
        
    }
    
    return(
        <div className={css.login}>
            <div className={css.loginText}>
                <h2 className={css.title}>Registration</h2>
                <p className={css.paragraph}>Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information</p>
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

                <div className={css.passwordField}>
                    <input 
                        className={`${css.input} ${css.marginBottom18}`}
                        type="password"
                        placeholder="Password"
                        {...register("password")}/>

                    {errors.password && (
                        <p className="error">{errors.password.message}</p>
                    )}

                    <FiEyeOff className={css.eye} />
                </div>

                <Button
                    variant="buttonForm"
                    type="submit"
                    aria-label=" Login submit">
                       Sign Up 
                </Button>    
            </form>
        </div>


    )
}

export default RegisterForm