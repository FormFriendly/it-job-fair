import {Id} from "@/Types/User/User";

type EmptyObj = Record<PropertyKey, never>;

export declare namespace iApi {

    type oCompany = {
        name: string,
        website: string,
        location: string,
        description: string,
        contact_phone: string,
        contact_email: string,
        logo_path: string,
        tg_link: string,
        id: string | number,
        user_id: string | number,
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