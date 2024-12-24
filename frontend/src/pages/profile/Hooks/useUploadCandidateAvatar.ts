import {useMutation} from '@tanstack/react-query';
import * as Api from '@/Api';
import {iApi} from "@/Api/Candidate/types";
import { useToast } from '@chakra-ui/react';

export const useUploadCandidateAvatar = () => {
    const toast = useToast()
    return useMutation({
        mutationFn: (params: iApi.iUploadAvatar) => {
            return Api.Candidate.uploadAvatar(params);
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