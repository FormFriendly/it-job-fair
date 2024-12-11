import {App} from '@/Types';
import styles from './index.module.scss';
import {Button} from 'antd';
import RegistrationForm from './Modules/RegistrationForm/RegistrationForm';
import Default from '@/Layouts/Default/Default';
import Routes from '@/Routes/Routes';
import Link from 'next/link';


const LoginPage: App.Next.NextPage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.title}>
                    Регистрация
                </div>
                <div className={styles.form}>
                    <RegistrationForm />
                </div>
                <Button size='large' type='link'>
                    <Link href={Routes.login}>Войти</Link>
                </Button>
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