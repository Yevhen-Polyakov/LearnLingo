import css from "./Footer.css.module.css"

const Footer =() => {
    return(
        <section className={css.footer}>
            <ul className={css.list}>
                <li className={css.item}>
                    <p className={css.number}>32,000+</p>
                    <p className={css.text}>Experienced tutors</p>
                </li>
                <li className={css.item}>
                    <p className={css.number}>300,000+</p>
                    <p className={css.text}>5-star tutor reviews</p>
                </li>
                <li className={css.item}>
                    <p className={css.number}>120+</p>
                    <p className={css.text}>Subjects taught</p>
                </li>
                <li className={css.item}>
                    <p className={css.number}>200+</p>
                    <p className={css.text}>Tutor nationalities</p>
                </li>
            </ul>
        </section>
    )
}

export default Footer