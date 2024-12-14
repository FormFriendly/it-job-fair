import {User} from '@/Types';

export declare namespace iApi {
    type oMe = User.Item;
    type iUpdateCandidate = {
        name: string,
        surname: string,
        patronymic: string,
        date_of_birth: string,
        avatar_path: string,
        tg_link: string,
    }
    type oUpdateCandidate = User.Item;
}