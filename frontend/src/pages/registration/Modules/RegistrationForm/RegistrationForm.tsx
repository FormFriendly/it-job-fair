import {Form, Input, Select, Button} from 'antd';
import styles from './RegistrationForm.module.scss';
import {iForm} from '../../Types/types';
import createRegistrationFormData from '../../Utils/createRegistrationFormData';
import {useRegistration} from '../../Hooks/useRegistration';

const RegistrationForm = () => {
    const {
        mutate: registration, 
        isPending: isRegistrationLoading
    } = useRegistration();

    const onRegistration = (values: iForm) => {
        const registrationFormData = createRegistrationFormData(values);
        registration({
            email: values.email,
            password: values.password,
            role: values.role,
        })
    }
    return (
        <Form<iForm>
            onFinish={onRegistration}
            layout="vertical">
                <Form.Item 
                    name="email" 
                    label="Email">
                    <Input 
                        size="large" 
                        placeholder="Email" />
                </Form.Item>
                    <Form.Item 
                        name="password" 
                        label="Пароль">
                        <Input.Password  
                            size="large" 
                            placeholder="Пароль" />
                </Form.Item>
                <Form.Item 
                    name="role" 
                    label="Роль" 
                    initialValue={"candidate"}>
                    <Select 
                        size='large' 
                        options={[
                            {value: "candidate", label: "Кандидат"},
                            {value: "company", label: "Компания"},
                        ]}/>
                </Form.Item>
                <Button 
                loading={isRegistrationLoading}
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