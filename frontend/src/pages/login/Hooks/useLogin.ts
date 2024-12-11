import {useMutation} from '@tanstack/react-query';
import {iApi} from '@/Api/Auth/types';
import * as Api from '@/Api';
import CS from '@/Storages/Cookie';
import {message} from 'antd';

export const useLogin = () => {
    return useMutation({
        mutationFn: (params: iApi.iLogin) => {
            return Api.Auth.login(params);
        },
        onError: () => {
            message.error('Неверный логин или пароль')
        },
        onSuccess: (data) => {
            CS.token.setAccess(data.access_token)
            message.success('Вы успешно вошли в аккаунт')
        }
    })
}