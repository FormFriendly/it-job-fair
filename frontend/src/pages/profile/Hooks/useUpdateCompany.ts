import {useMutation} from '@tanstack/react-query';
import {message} from 'antd';
import * as Api from '@/Api';
import {iApi} from "@/Api/Profile/types";

export const useUpdateCandidate = () => {
    return useMutation({
        mutationFn: (params: iApi.iUpdateCompany) => {
            return Api.Profile.updateCompany(params);
        },
        onError: () => {
            message.error('Ошибка при смене данных')
        },
        onSuccess: (data) => {
            message.success('Вы успешно сменили данные профиля')
        }
    })
}