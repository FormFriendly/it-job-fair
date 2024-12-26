import {useEffect} from 'react';
import Loader from "@/Components/Loader/Loader";
import {useUserRole} from '@/Hooks/User/useUserRole';
import {useRouter} from 'next/router';
import getRoute from '@/Routes/Routes';
import {Box} from '@chakra-ui/react'
import {useCandidateProfile} from "@/pages/profile/Hooks/useCandidateProfile";
import {useCompanyProfile} from "@/pages/profile/Hooks/useCompanyProfile";
import {useUserStore} from "@/Zustand/UserStore/User";


const RoutingPage = () => {
    const roles = useUserRole();
    const router = useRouter();

    const {data: candidateData, isPending: candidatePending} = useCandidateProfile({ enabled: roles.candidate });
    const {data: companyData, isPending: companyPending} = useCompanyProfile({ enabled: roles.company });

    const addNewCandidate = useUserStore((state) => state.actions.addNewCandidate);
    const addCompany = useUserStore((state) => state.actions.addCompany);

    useEffect(() => {
        if ((roles.candidate && candidatePending) || (roles.company && companyPending)) return;
        if (roles.unauth) router.push(getRoute.login)
        else {
            if (roles.candidate) router.push(getRoute.vacancies);
            else router.push(getRoute.profile.main);
        }
    }, [candidatePending, companyPending, roles]);

    useEffect(() => {
        if (!candidateData) return;
        addNewCandidate(candidateData)
    }, [candidateData])

    useEffect(() => {
        if (!companyData) return;
        addCompany(companyData)
    }, [companyData])


    return (
        <Box height={'100svh'} alignItems={'center'} justifyContent={'center'} display={'flex'} width={'100%'}>
            <Loader text="Выполняем маршрутизацию..." />
        </Box>
    )
}

export default RoutingPage;