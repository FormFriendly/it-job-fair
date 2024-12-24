import React from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Button, FormControl, FormLabel, Input, Select, Stack } from '@chakra-ui/react';
import { useRegistration } from '../../Hooks/useRegistration';
import createRegistrationFormData from '../../Utils/createRegistrationFormData';
import { iForm } from '../../Types/types';

const RegistrationForm = () => {
    const methods = useForm<iForm>();
    const { mutate: registration, isPending: isRegistrationLoading } = useRegistration();

    const onRegistration: SubmitHandler<iForm> = (values) => {
        const registrationFormData = createRegistrationFormData(values);
        registration({
            email: values.email,
            password: values.password,
            role: values.role,
        });
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onRegistration)} noValidate>
                <Stack spacing={4} width="100%">
                    <FormControl isRequired>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                            id="email"
                            placeholder="Email"
                            size="lg"
                            {...methods.register('email')}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel htmlFor="password">Пароль</FormLabel>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Пароль"
                            size="lg"
                            {...methods.register('password')}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel htmlFor="role">Роль</FormLabel>
                        <Select
                            id="role"
                            placeholder="Выберите роль"
                            size="lg"
                            defaultValue="candidate"
                            {...methods.register('role')}
                        >
                            <option value="candidate">Кандидат</option>
                            <option value="company">Компания</option>
                        </Select>
                    </FormControl>

                    <Button
                        isLoading={isRegistrationLoading}
                        type="submit"
                        colorScheme="blue"
                        size="lg"
                    >
                        Зарегистрироваться
                    </Button>
                </Stack>
            </form>
        </FormProvider>
    );
};

export default RegistrationForm;
