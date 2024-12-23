import {useMutation} from '@tanstack/react-query';
import {message} from 'antd';
import * as Api from '@/Api';
import {iApi} from "@/Api/Profile/types";

export const useUploadCompanyLogo = () => {
    return useMutation({
        mutationFn: (params: iApi.iUploadCompanyLogo) => {
            return Api.Profile.uploadCompanyLogo(params);
        },
        onError: () => {
            message.error('Ошибка при смене логотипа')
        },
        onSuccess: (data) => {
            message.success('Вы успешно сменили логотип')
        }
    })
}