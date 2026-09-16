import { useInfiniteQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";
import { getTeachers } from "../../lib/api/teacherService";
import css from "./TeachersPage.module.css"
import FilterCategory from "../../components/FilterCategory/FilterCategory";
import TeacherList from "../../components/TeacherList/TeacherList";
import Button from "../../components/Button/Button";
import { useOutletContext } from "react-router-dom";
import type { OutletContext } from "../../components/Layout/Layout";
import { useFilterStore } from "../../lib/store/filterStore";
import { filterTeachers } from "../../lib/utils/filterTeacher";

const PAGE_SIZE = 4

const TeachersPage = () => {
  const {openBooking} = useOutletContext<OutletContext>()
  const {language, level, price, setLanguage, setLevel, setPrice} = useFilterStore()

  const {data, error, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey: ['teachers'],
    queryFn: ({pageParam})  => {
      return getTeachers(pageParam, PAGE_SIZE)
    },

    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      if( lastPage.length < PAGE_SIZE) {
        return undefined
      }
      return allPages.length * PAGE_SIZE
    },
  });

  const teachers = data?.pages.flat() ?? [];

  const filteredTeachers = filterTeachers(teachers, {language, level, price})

    const visibleTeachers = filteredTeachers

    const languages = [...new Set(teachers.flatMap((teacher) => teacher.languages)),]

    const levels = [...new Set(teachers.flatMap((teacher) => teacher.levels)),]
  
    const prices = [...new Set(teachers.map((teacher) => teacher.price_per_hour)),]


  return(
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
        
        {isLoading && <Loader/>}
        {isError && <p>{error.message}</p>}
        {data && <TeacherList teachers={visibleTeachers} openBooking={openBooking}/>}
        { hasNextPage && (
          <Button 
            variant="loadMore" 
            type="button" 
            aria-label="Load more"
            onClick={()=> fetchNextPage()}
            disabled={isFetchingNextPage}
            >
              Load more
          </Button>
        )}
       
    </div>
  );
};

export default TeachersPage;
