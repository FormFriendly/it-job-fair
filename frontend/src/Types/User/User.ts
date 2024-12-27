

export declare namespace Role {
    export type BaseRole = 
        'candidate' |
        'company';

    //Выделили состояние без логина в отдельное значение чтобы проще было указывать у страниц в массиве
    export type State = 
        'auth' |
        'unauth';

    export type Result = BaseRole | State;

    export type ResultValues = Record<Result, boolean>;
}


export type Token = {
    access_token: string,
    refresh_token: string,
    token_type: string,
    access_expires_at: number;
    refresh_expires_at: number
}

export type Id = string;
export type Item = {
    email: string,
    role: Role.BaseRole;
    id: Id,
    name: string
    created_at: string,
    updated_at: string,
}

export declare namespace User {

    export type Candidate = {
        name: string,
        surname: string,
        patronymic?: string,
        date_of_birth?: string,
        contact_phone?: string,
        contact_email?: string,
        avatar_path?: string,
        tg_link?: string,
        id: string | number,
        user_id: string | number,
        created_at: string,
        updated_at: string,
        avatar_url?: string,
        resume_url?: string
    }

    type Company = {
        name: string,
        website?: string,
        location?: string,
        description?: string,
        contact_phone?: string,
        contact_email?: string,
        logo_path?: string,
        tg_link?: string,
        id: string | number,
        user_id: string | number,
        created_at: string,
        updated_at: string,
    }
}
