import type { Teacher } from "../../types/Type"
import css from "./Experience.module.css"
import { GoStarFill } from "react-icons/go";
import teacherCss from "../TeacherItem/TeacherItem.module.css"

type Props = {
    teacher: Teacher;
}
const Experience = ({teacher}: Props) => {
    return (
        <section className={css.experience}>
            <p className={css.textExperience}>{teacher.experience}</p>
            <ul className={css.reviewsList}>
                {teacher.reviews.map((review)=> (
                    <li key={review.reviewer_name}>
                        <div className={css.infoReview}>
                             <p className={css.name}>{review.reviewer_name}</p>
                            <p className={css.rating}><GoStarFill className={teacherCss.star}/> <span>{review.reviewer_rating}</span></p>
                        </div>
                        <p className={css.comment}>{review.comment}</p>
                       
                    </li>
                ))}
                
            </ul>
        </section>
    )
}

export default Experience