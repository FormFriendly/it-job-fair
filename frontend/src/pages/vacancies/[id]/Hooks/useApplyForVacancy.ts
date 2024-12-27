import {useMutation} from '@tanstack/react-query';
import {useToast} from "@chakra-ui/react";
import * as Api from '@/Api';
import {iApi} from "@/Api/Application/types";

export const useApplyForVacancy = () => {
    const toast = useToast()
    return useMutation({
        mutationFn: (params: iApi.iApplyForVacancy) => {
            return Api.Application.apply(params);
        },
        onError: () => {
            toast({
                position: "bottom-left",
                title: "Ошибка",
                description: "Ошибка при отлике",
                status: "error",
                isClosable: true,
            })
        },
        onSuccess: (data) => {
            toast({
                position: "bottom-left",
                description: "Вы успешно откликнулись на вакансию",
                status: 'success',
                isClosable: true,
            })
        }
    })
}