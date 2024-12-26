import {Button, Flex, Text} from "@chakra-ui/react";
import LongTextInput from "@/Components/LongTextInput";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {iApplication} from "@/pages/vacancies/[id]/Types/types";

type iApplicationForm = {
    vacancyId: number,
}


const ApplicationForm = (props: iApplicationForm) => {
    const methods = useForm<iApplication>();

    const { handleSubmit } = methods;

    const submitApplication: SubmitHandler<iApplication> = (values) => {
        console.log(values)
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submitApplication)}>
                <Flex flexDirection={"column"}>
                    <Flex flexDirection="column">
                        <Text mb={"4px"} fontWeight={500}>ФИО</Text>
                        <Text>Андреева Татьяна</Text>
                    </Flex>

                    <Flex flexDirection="column" my={"20px"}>
                        <Text mb={"4px"} fontWeight={500}>Резюме</Text>
                        <Text>название</Text>
                    </Flex>

                    <LongTextInput
                        label={"Сопроводительное письмо"}
                        registerName={"cover_letter"}
                        labelFontWeight={500}
                    />
                    <Button
                        type="submit"
                        colorScheme={"purple"}
                        width={"50%"}
                        alignSelf={"flex-end"}
                        height={"40px"}
                        mt={"28px"}
                    >
                        Откликнуться
                    </Button>
                </Flex>
            </form>
        </FormProvider>
    )
}

export default ApplicationForm
