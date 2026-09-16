import Hero from "../../components/Hero/Hero"
import css from "./HomePage.module.css"

const HomePage = () => {
    return(
        <div className={css.home}>
            <Hero/>
            
        </div>
    )
}

export default HomePage