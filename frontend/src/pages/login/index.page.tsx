import {useEffect} from 'react';
import {App} from '@/Types';
import styles from './index.module.scss';
import LoginForm from './Modules/LoginForm/LoginForm';
import {useRouter} from 'next/router';
import {useUser} from '@/Hooks/User/useUser';
import Default from '@/Layouts/Default/Default';
import Link from 'next/link';
import Routes from '@/Routes/Routes';
import {Button} from '@chakra-ui/react';


const LoginPage: App.Next.NextPage = () => {
    const router = useRouter();
    const {data: user} = useUser();
    useEffect(() => {
        if (!user) return;
        router.push('/');
    }, [user, router]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.title}>
                    С возвращением!
                </div>
                <div className={styles.formWrapper}>
                    <div className={styles.form}>
                        <LoginForm />
                    </div>
                    <Button size='large' type='submit'>
                        <Link href={Routes.registration}>Зарегистрироваться</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

LoginPage.getLayout = (page) => {
    return (
        <Default classes={{
            content: styles.layoutContent
        }}>
            {page}
        </Default>
    )
}

export default LoginPage;