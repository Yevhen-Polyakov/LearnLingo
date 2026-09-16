import type { Teacher } from "../../types/Type";

 type Filters = {
    language: string;
    level: string;
    price: string;
 }

 export const filterTeachers = (teachers: Teacher[], 
    {language, level, price}: Filters) => {
        return teachers.filter((teacher) => {
        return(
            (!language || teacher.languages.includes(language)) &&
            (!level || teacher.levels.includes(level)) &&
            (!price || teacher.price_per_hour === +(price))
        )
    }) 
 }

