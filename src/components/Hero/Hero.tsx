import css from "./Hero.module.css"
import heroimg from "../../assets/images/hero.webp"

import Footer from "../HeroFooter/Footer"
import { Link } from "react-router-dom"
const Hero = () => {
    return(
        <section className={`${css.hero} container`}>
            <div className={css.wrap}>
                <div className={css.content}>
                    <div className={css.textSection}>
                        <h1 className={css.title}>Unlock your potential with the best  <span className={css.span}><span className={css.spanletter}>l</span>anguage</span> tutors</h1>
                        <p className={css.paragraph}>Embark on an Exciting Language Journey with Expert Language Tutors:  Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors.</p>
                    </div>

                    <Link to="/Teachers" className={css.heroLink}>Get Started</Link>
                
                </div>
            
                <img src={heroimg} alt="Language tutor helping a student learn" />
            </div>

            <Footer/>

        </section>
    )
}

export default Hero