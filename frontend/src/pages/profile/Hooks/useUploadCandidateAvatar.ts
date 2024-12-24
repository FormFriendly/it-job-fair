import {useMutation} from '@tanstack/react-query';
import * as Api from '@/Api';
import {iApi} from "@/Api/Profile/types";
import { useToast } from '@chakra-ui/react';

export const useUploadCandidateAvatar = () => {
    const toast = useToast()
    return useMutation({
        mutationFn: (params: iApi.iUploadCandidateAvatar) => {
            return Api.Profile.uploadCandidateAvatar(params);
        },
        onError: () => {
            toast({
                position: "bottom-left",
                title: "Ошибка",
                description: "Ошибка при смене аватара",
                status: "error",
                isClosable: true,
            })
        },
        onSuccess: (data) => {
            toast({
                position: "bottom-left",
                description: "Вы успешно сменили аватар",
                status: 'success',
                isClosable: true,
            })
        }
    })
}