import {useMutation} from '@tanstack/react-query';
import {iApi} from '@/Api/Auth/types';
import * as Api from '@/Api';
import CS from '@/Storages/Cookie';
import {message} from 'antd';

export const useRegistration = () => {
    return useMutation({
        mutationFn: (params: iApi.iRegistration) => {
            return Api.Auth.registration(params);
        },
        onError: () => {
            message.error('Произошла ошибка при регистрации нового пользователя')
        },
        onSuccess: (data) => {
            CS.token.setAccess(data.access_token)
            message.success('Регистрация успешно завершена')
        }
    })
}