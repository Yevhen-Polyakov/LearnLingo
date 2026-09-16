export type Teacher = {
    id: string;
    name: string;
    surname: string;
    languages: string[];
    levels: string[];
    rating: number;
    price_per_hour: number;
    lessons_done: number;
    avatar_url: string;
    lesson_info: string;
    conditions: string[];
    experience: string;
    reviews: Review[];
}

export type TeacherResponse = {
    teachers: Teacher[]
}

type Review = {
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
};

export type FilterType = {
    languages: string[];
    price_per_hour: number[];
    levels: string[];
}