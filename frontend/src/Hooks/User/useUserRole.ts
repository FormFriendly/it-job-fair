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
    result.unauth = false;
    result.auth = true;

    if (data.role === "candidate") {
        result.candidate = true;

    } else {
       result.company = true;
    }

    return result;
}