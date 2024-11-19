import {isAxiosError, AxiosResponse} from 'axios';
import {Api} from '@/Types';


export const getErrorMessage = (ex: unknown) => {
    const messages = {
        front: {
            default: 'Ошибка при выполнении запроса',
            entityTooLarge: 'Объект запроса слишком велик'
        },
        back: 'Ошибка при получении ответа от сервера'
    }
    let response:AxiosResponse|undefined;

    if (isAxiosError(ex)) {
        response = ex.response;
    }

    //exeption - не из-за запроса
    if (!response) return messages.front.default;
    if (response.status === 413) {
        return messages.front.entityTooLarge;
    }

    return messages.front.default;
}