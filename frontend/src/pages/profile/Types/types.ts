import {User} from "@/Types/User/User";


export type iCandidateUser = User.Candidate

export type iProfileFormInputs = {
    surname: string,
    name: string,
    patronymic: string,
    contact_email: string,
    contact_phone: string,
    tg_link: string | null,
    avatar?: File | null,
    resume?: File | null,
}

export type iCompanyUser = User.Company

export type iCompanyProfileInputs = {
    name: string,
    website: string,
    location: string,
    description: string,
    contact_phone: string,
    contact_email: string,
    tg_link: string | null,
    logo?: File | null,
}

export type iProfileQuery = {
    enabled: boolean,
}