import {useMutation} from '@tanstack/react-query';
import * as Api from '@/Api';
import {iApi} from "@/Api/Company/types";
import { useToast } from '@chakra-ui/react';

export const useUpdateCompany = () => {
    const toast = useToast();
    return useMutation({
        mutationFn: (params: iApi.iUpdateCompany) => {
            return Api.Company.updateCompany(params);
        },
        onError: () => {
            toast({
                position: "bottom-left",
                title: "Ошибка",
                description: "Ошибка при смене данных",
                status: "error",
                isClosable: true,
            })
        },
        onSuccess: (data) => {
            toast({
                position: "bottom-left",
                description: "Вы успешно сменили данные профиля",
                status: 'success',
                isClosable: true,
            })
        }
    })
}