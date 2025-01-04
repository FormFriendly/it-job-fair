import {useEffect} from 'react';
import Loader from "@/Components/Loader/Loader";
import {useUserRole} from '@/Hooks/User/useUserRole';
import {useRouter} from 'next/router';
import getRoute from '@/Routes/Routes';
import {Box} from '@chakra-ui/react'
import {useUser} from '@/Hooks/User/useUser';

const RoutingPage = () => {
    const roles = useUserRole();
    const router = useRouter();

    const {isPending} = useUser()

    useEffect(() => {
        if (isPending) return;
        if (roles.unauth) router.push(getRoute.login)
        if (roles.candidate) router.push(getRoute.vacancies);
        if (roles.company) router.push(getRoute.profile.main);
    }, [isPending, roles]);

    return (
        <Box height={'100svh'} alignItems={'center'} justifyContent={'center'} display={'flex'} width={'100%'}>
            <Loader text="Выполняем маршрутизацию..." />
        </Box>
    )
}

export default RoutingPage;