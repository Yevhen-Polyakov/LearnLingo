import { useForm } from "react-hook-form"
import Button from "../Button/Button"
import css from "./LoginForm.module.css"
import { FiEyeOff } from "react-icons/fi"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import toast from "react-hot-toast"
import { loginUser } from "../../lib/api/authService"

const schema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required")    
})

type Props = {
    onSuccess: ()=> void;
}

type FormData = {
    email: string;
    password: string;
}

const LoginForm = ({onSuccess}: Props) => {
    const { register, handleSubmit, reset, formState: {errors},} = useForm<FormData>({resolver: yupResolver(schema)})

    const onSubmit = async (data: FormData) => {

        try{
            const user = await loginUser(data.email, data.password)
            
            console.log("LoginUser", user)

            reset()
            toast.success("Successfully logged in!")
            onSuccess()
            
        }catch(error) {
            toast.error(error instanceof Error ? error.message : "login error")
        }   
    }

    return (
        <div className={css.login}>
            <div className={css.loginText}>
                <h2 className={css.title}>Log In</h2>
                <p className={css.paragraph}>Welcome back! Please enter your credentials to access your account and continue your search for an teacher.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
                
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
                        className={css.input}
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
                        Log In
                </Button>    
            </form>

        </div>
    )
}

export default LoginForm