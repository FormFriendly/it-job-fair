import {Vacancy} from "@/Types/Vacancy/Vacancy";

type Id = number;

export type iVacancy = Vacancy.Item

export type iEvent = {
    name: string,
    description?: string,
    id: Id,
    starts_at: string,
    ends_at: string,
    created_at: string,
    updated_at: string,
    img_url?: string,
    img_path?: string,
}

