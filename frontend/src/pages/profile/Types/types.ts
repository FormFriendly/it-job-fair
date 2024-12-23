

export type iCandidateUser = {
    name: string,
    surname: string,
    patronymic: string,
    date_of_birth: string,
    contact_phone: string,
    contact_email: string,
    avatar_path: string,
    tg_link: string,
    id: string | number,
    user_id: string | number,
    created_at: string,
    updated_at: string,
    // TODO: добавить резюме как появятся изменения на беке
}

export type iProfileFormInputs = {
    surname: string,
    name: string,
    patronymic: string,
    contact_email: string,
    contact_phone: string,
    telegram: string,
    avatar_path: string,
    cv?: any
}

export type iCompanyUser = {
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

export type iCompanyProfileInputs = {
    name: string,
    website: string,
    location: string,
    description: string,
    contact_phone: string,
    contact_email: string,
    logo_path: string,
    telegram: string,
}