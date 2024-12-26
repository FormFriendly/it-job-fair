import {Id} from "@/Types/User/User";

type EmptyObj = Record<PropertyKey, never>;

export declare namespace iApi {
    type oCandidate = {
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
        avatar_url: string,
        resume_url: string
    }
    
    type iUpdateCandidate = {
        name: string,
        surname: string,
        patronymic: string,
        contact_phone?: string,
        contact_email?: string,
        tg_link?: string,
    }

    type oUpdateCandidate = oCandidate

    type iUploadAvatar = FormData
    type oUploadAvatar = EmptyObj

    type iUploadResume = FormData
    type oUploadResume = EmptyObj
}