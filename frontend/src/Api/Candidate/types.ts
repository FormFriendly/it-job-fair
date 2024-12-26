import {User} from "@/Types/User/User";

type EmptyObj = Record<PropertyKey, never>;

export declare namespace iApi {
    type oCandidate = User.Candidate
    
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