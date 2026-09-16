import css from "./Button.module.css"

type Props ={
    children: React.ReactNode;
    className?: string;
    variant?: "login" | "register" | "heroBtn" | "buttonForm" | "loadMore" | "heart" | "ReadMore" | "lesson";
    type?: "button" | "submit" | "reset";
    "aria-label"?: string;
    disabled?: boolean;
    onClick?: ()=> void;
}

const Button = ({ children, className = "", variant, ...props }:Props) => {
    const buttonClassName = [css.button, variant && css[variant], className]
        .filter(Boolean)
        .join(" ")

    return <button className={buttonClassName} {...props}>{children}</button>
}

export default Button