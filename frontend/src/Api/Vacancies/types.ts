import {Vacancy} from "@/Types/Vacancy/Vacancy";


export declare namespace iApi {

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