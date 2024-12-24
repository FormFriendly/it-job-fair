import {User} from '@/Types';
import {useUser} from './useUser';

export const useUserRole = ():User.Role.ResultValues => {
    const {data, isFetched} = useUser();
    const result: User.Role.ResultValues = {
        candidate: false,
        auth: false,
        company: false,
        unauth: true
    }
    //Данные еще не были запрошены точно неавторизованы
    if (!isFetched) return result;
    //Для неавторизованного пользователя, но данные уже загружены
    if (!data) return result;
    //Данные есть значит мы авторизованы
    console.log(data)
    result.unauth = false;
    result.auth = true;
    
    result.candidate = true; // TODO РЕАЛИЗОВАТЬ РАЗДЕЛЕНИЕ ДЛЯ КОМПАНИЙ И КАНДИДАТОВ - пока хардим кандидата
    // if (data.role === 'user') {
    //     result.candidate = true;
    // } else {
    //     result.admin = true;
    // } // TODO РЕАЛИЗОВАТЬ РАЗДЕЛЕНИЕ ДЛЯ КОМПАНИЙ И КАНДИДАТОВ
    return result;
}