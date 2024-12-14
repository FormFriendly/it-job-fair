import React from "react";
import {Text, Flex} from "@chakra-ui/react";
import {iUser} from "@/pages/profile/Types/types";
import TextInput from "@/Components/TextInput";
import {isValidEmail} from "@/Utils/Validation/isValidEmail";
import {useFormContext} from "react-hook-form";

type iProfileContacts = {
    user: iUser
}

const ProfileContacts = (props: iProfileContacts) => {
    const { formState: { errors } } = useFormContext();

    return (
        <Flex flexDirection="column" mt={"32px"}>
            <Text
                fontWeight={600}
                fontSize={"20px"}
                mb={"12px"}
            >
                Контакты:
            </Text>
            <Flex>
                <TextInput
                    label={"Email"}
                    registerName={"email"}
                    placeholder={"не указан"}
                    registerOptions={
                        {
                            required: {
                                value: true,
                                message: "Обязательное поле"
                            },
                            validate: {
                                isValid: (value: string) => isValidEmail(value) || "Введите email в формате example@mail.ru"
                            },
                        }
                    }
                    withError={true}
                    errorMessage={errors.email ? String(errors.email?.message) : undefined}
                />
                <TextInput
                    label={"Телефон"}
                    registerName={"phone"}
                    margins={"0 20px"}
                    placeholder={"не указан"}
                />
                <TextInput
                    label={"Telegram"}
                    registerName={"telegram"}
                    placeholder={"не указан"}
                />
            </Flex>
        </Flex>
    )
}

export default ProfileContacts