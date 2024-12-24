import {QueryClient, useMutation, useQueryClient} from '@tanstack/react-query';
import {iApi} from '@/Api/Auth/types';
import * as Api from '@/Api';
import CS from '@/Storages/Cookie';
import Routes from '@/Routes/Routes';
import { useRouter } from 'next/router';
import {queryKey as userQueryKey} from '@/Hooks/User/useUser';
import { useToast } from '@chakra-ui/react';

export const useLogin = () => {
    const toast = useToast()
    const router = useRouter()
    const client = useQueryClient();
    return useMutation({
        mutationFn: (params: iApi.iLogin) => {
            return Api.Auth.login(params);
        },
        onError: () => {
            toast({
                position: "bottom-left",
                title: "Ошибка",
                description: "Неверный логин или пароль",
                status: "error",
                isClosable: true,
            })
        },
        onSuccess: async (data) => {
            CS.token.setAccess(data.access_token)
            toast({
                position: "bottom-left",
                title: 'Вы успешно вошли в аккаунт',
                status: 'success',
                isClosable: true,
            })
            // message.success('Вы успешно вошли в аккаунт')
            await client.refetchQueries({queryKey: userQueryKey})
            router.push(Routes.profile.main)
        }
    })
}