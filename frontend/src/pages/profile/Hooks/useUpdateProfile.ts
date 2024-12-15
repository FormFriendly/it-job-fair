import {useMutation} from '@tanstack/react-query';
import {message} from 'antd';
import * as Api from '@/Api';
import {iApi} from "@/Api/User/types";

export const useUpdateProfile = () => {
    return useMutation({
        mutationFn: (params: iApi.iUpdateCandidate) => {
            return Api.User.updateCandidate(params);
        },
        onError: () => {
            message.error('Ошибка при смене данных')
        },
        onSuccess: (data) => {
            message.success('Вы успешно сменили данные профиля')
        }
    })
}