import {User} from "@/Types/User/User";

type EmptyObj = Record<PropertyKey, never>;

export declare namespace iApi {

    type oCompany = User.Company

    type iUpdateCompany = {
        name: string,
        description: string,
        website: string,
        location: string,
        contact_phone: string,
        contact_email: string,
        tg_link?: string,
    }

    type oUpdateCompany = oCompany

    type iUploadLogo = FormData
    type oUploadLogo = EmptyObj
}