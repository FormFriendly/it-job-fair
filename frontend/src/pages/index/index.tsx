import {useEffect} from 'react';
import Loader from "@/Components/Loader/Loader";
import {useUserRole} from '@/Hooks/User/useUserRole';
import {useRouter} from 'next/router';
import getRoute from '@/Routes/Routes';
import {Box} from '@chakra-ui/react'


const RoutingPage = () => {
    const roles = useUserRole();
    const router = useRouter();
    useEffect(() => {
        if (roles.unauth) router.push(getRoute.login)
        else {
            if (roles.candidate) router.push(getRoute.profile.main);
            // else router.push(getRoute.profileAdmin.main); // Переделать на компанию
        }
    }, []);

    return (
        <Box height={'100svh'} alignItems={'center'} justifyContent={'center'} display={'flex'} width={'100%'}>
            <Loader text="Выполняем маршрутизацию..." />
        </Box>
    )
}

export default RoutingPage;