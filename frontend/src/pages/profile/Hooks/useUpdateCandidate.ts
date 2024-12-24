import {useMutation} from '@tanstack/react-query';
import {useToast} from "@chakra-ui/react";
import * as Api from '@/Api';
import {iApi} from "@/Api/Candidate/types";

export const useUpdateCandidate = () => {
    const toast = useToast()
    return useMutation({
        mutationFn: (params: iApi.iUpdateCandidate) => {
            return Api.Candidate.updateCandidate(params);
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