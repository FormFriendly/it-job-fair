import {useMutation} from '@tanstack/react-query';
import * as Api from '@/Api';
import {iApi} from "@/Api/Profile/types";
import { useToast } from '@chakra-ui/react';

export const useUploadCompanyLogo = () => {
    const toast = useToast()
    return useMutation({
        mutationFn: (params: iApi.iUploadCompanyLogo) => {
            return Api.Profile.uploadCompanyLogo(params);
        },
        onError: () => {
            toast({
                position: "bottom-left",
                title: "Ошибка",
                description: "Ошибка при смене логотипа",
                status: "error",
                isClosable: true,
            })
        },
        onSuccess: (data) => {
            toast({
                position: "bottom-left",
                description: "Вы успешно сменили логотип",
                status: 'success',
                isClosable: true,
            })
        }
    })
}