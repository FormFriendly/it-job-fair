import {User} from "@/Types/User/User";


export declare namespace iApi {
    type Id = number;

    type iSkill = {
        skill: string,
        id: Id
    }

    type iSpecialization = {
        name: string,
        id: Id
    }
    type oVacancy = {
        title: string,
        description?: string,
        salary: number,
        salary_type: "from" | "to",
        currency?: string,
        location?: string,
        work_mode: "remote" | "hybrid" | "office",
        employment_type: "full-time" | "part-time",
        experience: "no experience" | "less than year" | "1-2 years" | "3-4 years" | "5+ years",
        status: "active" | "closed" | "archived" | "draft",
        id: Id,
        company_id: Id,
        event_id: Id,
        specialization_id: Id,
        created_at: string,
        updated_at: string,
        skills: Array<iSkill>,
        specialization: iSpecialization,
        company: User.Company
    }

    type oVacancies = Array<oVacancy>
}