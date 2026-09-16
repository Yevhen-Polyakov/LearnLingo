import type { Teacher } from "../../types/Type"
import TeacherItem from "../TeacherItem/TeacherItem"
import css from "./TeacherList.module.css"

type Props = {
    teachers: Teacher[]
    openBooking: (teacher: Teacher)=> void;
}

const TeacherList = ({teachers, openBooking}:Props) => {
    return (
        <ul className={css.list}>
            {teachers.map((teacher)=> (
                <TeacherItem key={teacher.id} teacher={teacher} openBooking={() => openBooking(teacher)}/>
            ))}
        </ul>
    )
}

export default TeacherList