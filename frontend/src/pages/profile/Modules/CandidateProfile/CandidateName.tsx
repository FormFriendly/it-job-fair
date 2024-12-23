import TextInput from "@/Components/TextInput";
import {Flex} from "@chakra-ui/react";
import React from "react";
import {useFormContext} from "react-hook-form";


type iProfileName = {
    isEditMode: boolean;
}

const CandidateName = (props: iProfileName) => {
    const { formState: { errors } } = useFormContext();

    return (
        <Flex width={"100%"}>
            <TextInput
                label={"Фамилия"}
                registerName={"surname"}
                placeholder={"не указана"}
                registerOptions={
                    {
                        required: {
                            value: true,
                            message: "Обязательное поле"
                        }
                    }
                }
                withError={true}
                errorMessage={errors.surname ? String(errors.surname?.message) : undefined}
                isDisabled={!props.isEditMode}
            />
            <TextInput
                label={"Имя"}
                registerName={"name"}
                margins={"0 20px"}
                placeholder={"не указано"}
                registerOptions={
                    {
                        required: {
                            value: true,
                            message: "Обязательное поле"
                        }
                    }
                }
                withError={true}
                errorMessage={errors.name ? String(errors.name?.message) : undefined}
                isDisabled={!props.isEditMode}
            />
            <TextInput
                label={"Отчество"}
                registerName={"patronymic"}
                placeholder={"не указано"}
                isDisabled={!props.isEditMode}
            />
        </Flex>
    )
}

export default CandidateName;