import TextInput from "@/Components/TextInput";
import React from "react";
import {Flex} from "@chakra-ui/react";
import LongTextInput from "@/Components/LongTextInput";
import {useFormContext} from "react-hook-form";

type iCompanyDetails = {
    isEditMode: boolean;
}

const CompanyDetails = (props: iCompanyDetails) => {
    const { formState: { errors } } = useFormContext();

    return (
        <Flex flexDirection="column">
            <TextInput
                label={"Название"}
                registerName={"name"}
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
            <Flex mb={"30px"} mt={"8px"}>
                <TextInput
                    label={"Сайт компании"}
                    registerName={"website"}
                    placeholder={"не указан"}
                    margins={"0 20px 0 0"}
                    isDisabled={!props.isEditMode}
                />
                <TextInput
                    label={"Местоположение"}
                    registerName={"location"}
                    placeholder={"не указано"}
                    isDisabled={!props.isEditMode}
                />
            </Flex>
            <LongTextInput
                label={"Описание"}
                registerName={"description"}
                placeholder={"не указано"}
                isDisabled={!props.isEditMode}
            />
        </Flex>
    )
}

export default CompanyDetails;