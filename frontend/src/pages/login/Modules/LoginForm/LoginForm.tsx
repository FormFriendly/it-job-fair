import {Form, Input, Button} from 'antd';
import styles from './LoginForm.module.scss';
import {useLogin} from '../../Hooks/useLogin';
import createLoginFormData from '../../Utils/createLoginFormData';
import {iForm} from '../../Types/types';

const LoginForm = () => {
    const {
        mutate: login, 
        isPending: isLoginLoading
    } = useLogin();

    const onLogin = (values: iForm) => {
        const loginFormData = createLoginFormData(values);
        login(loginFormData)
    }
    
    return (
        <Form<iForm> 
            onFinish={onLogin}
            layout="vertical">
            <Form.Item 
                label="Email"
                name="username">
                <Input 
                    placeholder='Введите логин' 
                    size="large"/>
            </Form.Item>
            <Form.Item 
                label="Пароль"
                name="password">
                <Input.Password 
                    placeholder='Введите пароль' 
                    size="large"/>
            </Form.Item>
            <Button 
                loading={isLoginLoading}
                htmlType="submit"
                className={styles.submit}
                size="large"
                type="primary">
                Войти в профиль
            </Button>
        </Form>
    )
}

export default LoginForm;