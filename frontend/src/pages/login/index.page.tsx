import {useEffect} from 'react';
import Layout from './Layout/Layout';
import {App} from '@/Types';
import styles from './index.module.scss';
// import Logo from '@/Img/logo.png';
import Image from 'next/image';
import LoginForm from './Modules/LoginForm/LoginForm';
import {useRouter} from 'next/router';
import {useUser} from '@/Hooks/User/useUser';


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
                <div className={styles.logoWrapper}>
                    {/* <Image 
                        className={styles.logo}
                        src={Logo}
                        quality={100}
                        alt="logo"
                    /> */}
                </div>
                <div className={styles.title}>
                Авторизация
                </div>
                <div className={styles.formWrapper}>
                    <div className={styles.form}>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

LoginPage.getLayout = (children) => {
    return (
        <Layout>
            {children}
        </Layout>
    )
}

export default LoginPage;