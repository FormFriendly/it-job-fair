import {User} from '@/Types';

export declare namespace iApi {
    type iLogin = FormData
    type oLogin = {
        email: string,
        role: string, // TODO вынести варианты в ENUM
        access_token: string,
        token_type: string
    }

    type iRegistration = {
        email: string,
        role: string, // TODO вынести варианты в ENUM
        password: string
    }
    type oRegistration = {
        email: string,
        role: string, // TODO вынести варианты в ENUM
        access_token: string,
        token_type: string
    }
}