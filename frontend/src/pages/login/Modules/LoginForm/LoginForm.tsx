import React from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useLogin } from '../../Hooks/useLogin';
import createLoginFormData from '../../Utils/createLoginFormData';
import { iForm } from '../../Types/types';

const LoginForm = () => {
    const methods = useForm<iForm>();
    const { mutate: login, isPending: isLoginLoading } = useLogin();

    const onLogin: SubmitHandler<iForm> = (values) => {
        const loginFormData = createLoginFormData(values);
        login(loginFormData);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onLogin)} noValidate>
                <FormControl isRequired>
                    <FormLabel htmlFor="username">Email</FormLabel>
                    <Input
                        id="username"
                        placeholder="Введите логин"
                        size="lg"
                        {...methods.register('username')}
                    />
                </FormControl>

                <FormControl isRequired mt={4}>
                    <FormLabel htmlFor="password">Пароль</FormLabel>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Введите пароль"
                        size="lg"
                        {...methods.register('password')}
                    />
                </FormControl>

                <Button
                    isLoading={isLoginLoading}
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    mt={4}
                >
                    Войти в профиль
                </Button>
            </form>
        </FormProvider>
    );
};

export default LoginForm;
