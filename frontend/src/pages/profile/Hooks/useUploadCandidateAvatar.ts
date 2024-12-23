import {useMutation} from '@tanstack/react-query';
import {message} from 'antd';
import * as Api from '@/Api';
import {iApi} from "@/Api/Profile/types";

export const useUploadCandidateAvatar = () => {
    return useMutation({
        mutationFn: (params: iApi.iUploadCandidateAvatar) => {
            return Api.Profile.uploadCandidateAvatar(params);
        },
        onError: () => {
            message.error('Ошибка при смене аватара')
        },
        onSuccess: (data) => {
            message.success('Вы успешно сменили аватар')
        }
    })
}