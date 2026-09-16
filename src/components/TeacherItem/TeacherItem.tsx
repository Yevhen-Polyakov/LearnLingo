import type { Teacher } from "../../types/Type"
import css from "./TeacherItem.module.css"
import { IoBookOutline } from "react-icons/io5"
import { GoStarFill } from "react-icons/go";
import Button from "../Button/Button";
import { LuHeart } from "react-icons/lu";
import { useState } from "react";
import Experience from "../Experience/Experience";
import { useFavoriteStore } from "../../lib/store/favoriteStore";
import { IoMdHeart } from "react-icons/io";
import { useAuthStore } from "../../lib/store/authStore";
import toast from "react-hot-toast";


type Props = {
    teacher: Teacher 
    openBooking: () => void;
}
const TeacherItem = ({teacher, openBooking}:Props) => {
    const [readMore, setReadMore]= useState(false)

    const favoriteIds = useFavoriteStore((state) => state.favoriteIds)
    const addFavorite = useFavoriteStore((state) => state.addFavorite)
    const removeFavorite = useFavoriteStore((state)=> state.removeFavorite)

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
    const uid = useAuthStore((state)=> state.currentUser?.uid ?? null)

    const isFavorite = favoriteIds.includes(teacher.id)

    const openReadMore = () => {
       setReadMore((prev) => !prev)
    } 

    const handleFavorite = () => {
        if(!isLoggedIn || !uid){
            toast.error("This feature is available only for authorized users")
            return
        }
        
        if (isFavorite) {
            removeFavorite(teacher.id, uid)
        } else {
            addFavorite(teacher.id, uid)
        }
    }

    return(
        <li className={css.item}>

            <div className={css.imgWrapper}>
                <img className={css.img} src={teacher.avatar_url} alt={teacher.name} />
            </div>  

            <div className={css.teacherInfo}>
                <div className={css.headerCard}>
                    <p className={css.language}>Langues</p>
                    <ul className={css.teacherStatsList}>
                        <li className={css.teacherStatsItem}> <IoBookOutline className={css.book} />Lessons online</li> 
                        <span className={css.line}>|</span>
                        <li className={css.teacherStatsItem}>Lessons done: {teacher.lessons_done}</li>
                        <span className={css.line}>|</span>
                        <li className={css.teacherStatsItem}><GoStarFill className={css.star} />Rating:{teacher.rating}</li>
                        <span className={css.line}>|</span>
                        <li className={css.teacherStatsItem}>Price / 1 hour: <span className={css.price}>{teacher.price_per_hour}$</span></li>
                    </ul>
                    <Button 
                        variant="heart"
                        type="button"
                        onClick={handleFavorite}
                        aria-label={isFavorite ? "REmove from favorites" : "Add to favorites"}>
                        {isFavorite 
                        ? (<IoMdHeart className={css.heartActive}/>)
                        : (<LuHeart className={css.heart} />)}
                    </Button>
                </div>

                <h2 className={css.title}>{teacher.name} {teacher.surname}</h2>
                <ul className={css.teacherDescList}>
                    <li className={css.teacherDescItem}>
                        <p className={css.languages}>Speaks: <span className={`${css.textSpan} ${css.textDecoration}`}>{teacher.languages.join(", ")}</span></p>
                    </li>
                    <li className={css.teacherDescItem}>
                        <p className={css.languages}>Lesson info: <span className={css.textSpan}>{teacher.lesson_info}</span></p>
                    </li>
                    <li className={css.teacherDescItem}>
                        <p className={css.languages}>Conditions: <span className={css.textSpan}>{teacher.conditions}</span></p>
                    </li>
                </ul>
                 {readMore ? (
                    <Experience teacher={teacher}/>
                 ) : (
                    <Button 
                    onClick={openReadMore}
                    type="button" 
                    variant="ReadMore" 
                    aria-label="Read More">
                    Read More
                </Button>
                 )}   
                
                <ul className={css.levelsList}>
                    {teacher.levels.map((level)=> (
                        <li className={css.levelsItem} key={level}>#{level}</li>
                    ))}
                </ul>

                {readMore && (
                    <Button
                        onClick={openBooking}
                        variant="lesson"
                        type="button"
                        aria-label="Book trail lesson">
                            Book trial lesson
                    </Button>
                )}
            </div>
            
        </li>
    )
}

export default TeacherItem