import {useMutation} from '@tanstack/react-query';
import {useToast} from "@chakra-ui/react";
import * as Api from '@/Api';
import { iApi } from '@/Api/Vacancies/types';

export const useCreateVacancy = () => {
    const toast = useToast()
    return useMutation({
        mutationFn: (params: iApi.iCreateVacancy) => {
            return Api.Vacancies.createVacancy(params);
        },
        onError: () => {
            toast({
                position: "bottom-left",
                title: "Ошибка",
                description: "Ошибка при создании вакансии",
                status: "error",
                isClosable: true,
            })
        },
        onSuccess: (data) => {
            toast({
                position: "bottom-left",
                description: "вакансия успешно создана",
                status: 'success',
                isClosable: true,
            })
        }
    })
}