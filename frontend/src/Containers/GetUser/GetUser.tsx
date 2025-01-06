import {useUser} from '@/Hooks/User/useUser';
import Loader from '@/Components/Loader/Loader';
import styles from './GetUser.module.scss';
import { useUserRole } from '@/Hooks/User/useUserRole';
import { useUserStore } from '@/Zustand/UserStore/User';
import { useEffect } from 'react';
import { User } from '@/Types/User/User';

type iCheckAuth = {
    children: React.ReactNode;
}

//Контейнер для проверки данных авторизации
const GetUser = (props: iCheckAuth) => {
    const roles = useUserRole();

    const {data, isPending} = useUser()

    const addNewCandidate = useUserStore((state) => state.actions.addNewCandidate);
    const addCompany = useUserStore((state) => state.actions.addCompany);

    useEffect(() => {
        if (isPending) return;
        if (roles.candidate) addNewCandidate(data as User.Candidate)
        if (roles.company) addCompany(data as User.Company)
    }, [isPending, roles, data]);

    if (isPending) {
        return (
            <div className={styles.wrapper}>
                <Loader 
                    text="Загрузка данных пользователя..."
                />
            </div>
        )
    }
    return props.children;
}

export default GetUser;