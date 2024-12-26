import React from "react";
import {Text, Flex} from "@chakra-ui/react";
import TextInput from "@/Components/TextInput";
import {isValidEmail} from "@/Utils/Validation/isValidEmail";
import {useFormContext} from "react-hook-form";

type iProfileContacts = {
    isEditMode: boolean;
}

const ProfileContacts = (props: iProfileContacts) => {
    const { resetField, formState: { errors } } = useFormContext();

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
                    registerName={"contact_email"}
                    placeholder={"не указан"}
                    registerOptions={
                        {
                            validate: {
                                isValid: (value: string | null) => {
                                    if (!value) {
                                        resetField("contact_email");
                                        return
                                    }
                                    return isValidEmail(value) || "Введите email в формате example@mail.ru"
                                }
                            },
                        }
                    }
                    withError={true}
                    errorMessage={errors.contact_email ? String(errors.contact_email?.message) : undefined}
                    isDisabled={!props.isEditMode}
                />
                <TextInput
                    label={"Телефон"}
                    registerName={"contact_phone"}
                    margins={"0 20px"}
                    placeholder={"не указан"}
                    isDisabled={!props.isEditMode}
                />
                <TextInput
                    label={"Telegram"}
                    registerName={"telegram"}
                    placeholder={"не указан"}
                    isDisabled={!props.isEditMode}
                />
            </Flex>
        </Flex>
    )
}

export default ProfileContacts