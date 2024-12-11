import {Form, FormInstance, Input, Switch, Space, Select, Button} from 'antd';
import {iApi} from '@/Api/Auth/types';
import styles from './RegistrationForm.module.scss';
export {useRegistrationState} from '@/Hooks/User/useRegistration';
import {iForm} from '../../Types/types';
import createRegistrationFormData from '../../Utils/createRegistrationFormData';

const RegistrationForm = () => {
    // const {
    //     mutate: login, 
    //     isPending: isLoginLoading
    // } = ();

    const onRegistration = (values: iForm) => {
        const registrationFormData = createRegistrationFormData(values);
        // registration(registrationFormData)
    }
    return (
        <Form<iForm>
            onFinish={(values) => {
                // props.onFinish && props.onFinish(values);
            }}
            layout="vertical">
                <Form.Item name="email" label="Email">
                    <Input size="large" placeholder="Email" />
                </Form.Item>
                    <Form.Item name="password" label="Пароль">
                        <Input.Password  size="large" placeholder="Пароль" />
                </Form.Item>
                <Form.Item name="role" label="Роль" initialValue={"candidate"}>
                    <Select size='large' options={[
                        {value: "candidate", label: "Кандидат"},
                        {value: "company", label: "Компания"},
                    ]}/>
                </Form.Item>
                <Button 
                // loading={isRegistrationLoading}
                htmlType="submit"
                className={styles.submit}
                size="large"
                type="primary">
                    Зарегистрироваться
                </Button>
        </Form>
    )
}

export default RegistrationForm;