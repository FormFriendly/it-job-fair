import {Id} from "@/Types/User/User";

type EmptyObj = Record<PropertyKey, never>;

export declare namespace iApi {

    type oCompany = {
        name: string,
        surname: string,
        patronymic: string,
        date_of_birth: string,
        contact_phone: string,
        contact_email: string,
        tg_link: string,
        id: Id,
        user_id: Id,
        avatar_path: string,
        resume_path: string,
        created_at: string,
        updated_at: string,
    }

    type iUpdateCompany = {
        name: string,
        description: string,
        website: string,
        location: string,
        contact_phone: string,
        contact_email: string,
        tg_link: string,
    }

    type oUpdateCompany = oCompany

    type iUploadLogo = File
    type oUploadLogo = EmptyObj
}