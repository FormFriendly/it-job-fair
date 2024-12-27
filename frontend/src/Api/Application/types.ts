import {User} from "@/Types/User/User";


export declare namespace iApi {
    type iApplyForVacancy = {
        vacancy_id: number,
        cover_letter?: string
    }

    type oApplyForVacancy = {
        cover_letter: string,
        resume_path: string,
        status: string,
        is_favorited: boolean,
        is_withdrawn: boolean,
        id: number,
        vacancy_id: number,
        candidate_id: number,
        created_at: string,
        updated_at: string,
        resume_url: string,
        candidate: User.Candidate
    }
}