import type { Teacher, } from "../../types/Type"

const myAPI = import.meta.env.VITE_API_URL 
const teachers = "teachers/teachers"

export const getTeachers = async (start:number, limit: number = 4):Promise<Teacher[]> => {
      const end = start + limit - 1

        const params = new URLSearchParams({
            orderBy: '"$key"',
            startAt: `"${start}"`,
            endAt: `"${end}"`,
      });

      const response = await fetch(`${myAPI}${teachers}.json?${params.toString()}`)

      if (!response.ok) {
         throw new Error(`Failed to fetch teachers: ${response.status}`)
      }

      const data: Record<string, Omit<Teacher, "id">> | null =  await response.json()
        
      if(!data){
            return []
      }

      return  Object.entries(data).map(([id, teachers]) =>({
            ...teachers,
            id,
            
      })) as Teacher[]   
}

 export const  getTeacherById = async (id:string): Promise<Teacher> => {
      const response = await fetch(`${myAPI}${teachers}/${id}.json`)

      if(!response.ok) {
            throw new Error(`Failed to fetch teacher: ${response.status}`);
      }

      const data: Omit<Teacher, "id"> | null = await response.json()

      if( !data) {
            throw new Error("Teacher not found")
      }

      return {
            ...data,
            id,
      }
 }