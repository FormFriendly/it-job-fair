import {useMutation} from '@tanstack/react-query';
import {iApi} from '@/Api/Auth/types';
import * as Api from '@/Api';
import CS from '@/Storages/Cookie';
import { useToast } from '@chakra-ui/react';

export const useRegistration = () => {
    const toast = useToast()
    return useMutation({
        mutationFn: (params: iApi.iRegistration) => {
            return Api.Auth.registration(params);
        },
        onError: () => {
            toast({
                position: "bottom-left",
                title: "Ошибка",
                description: "Произошла ошибка при регистрации нового пользователя",
                status: 'error',
                isClosable: true,
            })
        },
        onSuccess: (data) => {
            CS.token.setAccess(data.access_token)
            toast({
                position: "bottom-left",
                title: "Регистрация успешно завершена",
                status: 'success',
                isClosable: true,
            })
        }
    })
}