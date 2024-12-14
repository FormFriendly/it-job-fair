

export type iUser = {
    name: string,
    surname: string,
    patronymic: string,
    date_of_birth: string,
    phone: string,
    email?: string, 
    avatar_path: string,
    tg_link: string,
    id: string | number,
    user_id: string | number,
    created_at: string,
    updated_at: string,
    // TODO: добавить резюме как появятся изменения на беке
}

export type IProfileFormInputs = {
    surname: string,
    name: string,
    patronymic: string,
    email: string,
    phone: string,
    telegram: string,
    avatar_path: string,
    cv?: any
}