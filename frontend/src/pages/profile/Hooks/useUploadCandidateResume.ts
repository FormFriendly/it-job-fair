import {useMutation} from '@tanstack/react-query';
import * as Api from '@/Api';
import {iApi} from "@/Api/Candidate/types";
import { useToast } from '@chakra-ui/react';

export const useUploadCandidateResume = () => {
    const toast = useToast()
    return useMutation({
        mutationFn: (params: iApi.iUploadResume) => {
            return Api.Candidate.uploadResume(params);
        },
        onError: () => {
            toast({
                position: "bottom-left",
                title: "Ошибка",
                description: "Ошибка при загрузке резюме",
                status: "error",
                isClosable: true,
            })
        },
        onSuccess: (data) => {
            toast({
                position: "bottom-left",
                description: "Вы успешно загрузили резюме",
                status: 'success',
                isClosable: true,
            })
        }
    })
}