import { useQueries } from "@tanstack/react-query";
import { useFavoriteStore } from "../../lib/store/favoriteStore";
import css from "../TeachersPage/TeachersPage.module.css"
import { getTeacherById } from "../../lib/api/teacherService";
import type { Teacher } from "../../types/Type";
import { useFilterStore } from "../../lib/store/filterStore";
import { filterTeachers } from "../../lib/utils/filterTeacher";
import FilterCategory from "../../components/FilterCategory/FilterCategory";
import TeacherList from "../../components/TeacherList/TeacherList";
import { useOutletContext } from "react-router-dom";
import type { OutletContext } from "../../components/Layout/Layout";

const FavoritesPage = () => {
  const { openBooking} = useOutletContext<OutletContext>()

  const favoriteIds = useFavoriteStore((state)=> state.favoriteIds)
  const { language, level, price, setLanguage, setLevel, setPrice} = useFilterStore()
  
  const favoritesQueries = useQueries({
    queries: favoriteIds.map((id) => ({
      queryKey:["teacher", id],
      queryFn: () => getTeacherById(id),
    }))
  })

  const favoriteTeachers = favoritesQueries
    .map((query) => query.data)
    .filter((teacher): teacher is Teacher => Boolean(teacher))

  const isLoading = favoritesQueries.some((query) => query.isLoading)
  const isError = favoritesQueries.some((query) => query.isError)

  const filteredFavorites = filterTeachers(favoriteTeachers,{language, level, price})

  const languages = [...new Set(favoriteTeachers.flatMap((teacher) => teacher.languages ))]
  const levels = [...new Set(favoriteTeachers.flatMap((teacher) => teacher.levels ))]
  const prices = [...new Set(favoriteTeachers.map((teacher) => teacher.price_per_hour))]  
  return (
    <div className={`${css.teachersPage} container`}>
        <FilterCategory
          languages={languages}
          levels={levels}
          prices={prices}
          language={language}
          level={level}
          price={price}
          onLanguageChange={setLanguage}
          onLevelChange={setLevel}
          onPrice={setPrice}/>

          {!isLoading && ! isError && (
            <TeacherList teachers={filteredFavorites} openBooking={openBooking}/>
          )}
    </div>
  ) 

};

export default FavoritesPage;
