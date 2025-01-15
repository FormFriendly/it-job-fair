import {Vacancy} from "@/Types/Vacancy/Vacancy";


export declare namespace iApi {

    type Candidate = {
        name: string;
        surname: string;
        patronymic: string;
        date_of_birth: string;
        contact_phone: string;
        contact_email: string;
        tg_link: string;
        id: number;
        user_id: number;
        avatar_path: string;
        resume_path: string;
        created_at: string;
        updated_at: string;
        avatar_url: string;
        resume_url: string;
    }
      
      type Application = {
        cover_letter: string;
        resume_path: string;
        status: 'pending' | 'viewed' | 'accepted' | 'rejected';
        is_favorited: boolean;
        is_withdrawn: boolean;
        id: number;
        vacancy_id: number;
        candidate_id: number;
        created_at: string;
        updated_at: string;
        resume_url: string;
        candidate: Candidate;
    }

    type iCreateVacancy = {
        title: string;
        description: string;
        salary: number;
        salary_type: string;
        currency: string;
        location: string;
        work_mode: string;
        employment_type: string;
        experience: string;
    };

    type oVacancy = Vacancy.Item

    type oVacancies = Array<oVacancy>

    type iParams = {
        text?: string;
    }
}