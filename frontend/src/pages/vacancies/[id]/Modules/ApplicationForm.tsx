import {Button, Flex, Link, Text} from "@chakra-ui/react";
import LongTextInput from "@/Components/LongTextInput";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {iApplication} from "@/pages/vacancies/[id]/Types/types";
import {User} from "@/Types/User/User";
import getResumeName from "@/Utils/Profile/getResumeName";
import React from "react";
import createFullName from "@/Utils/Profile/createFullName";
import {useApplyForVacancy} from "@/pages/vacancies/[id]/Hooks/useApplyForVacancy";

type iApplicationForm = {
    vacancyId: number,
    candidate: User.Candidate,
    onClose: () => void
}


const ApplicationForm = (props: iApplicationForm) => {
    const methods = useForm<iApplication>({
        defaultValues: {
            cover_letter: undefined,
        }
    });
    const { handleSubmit } = methods;

    const { mutate: apply, isPending: isApplying } = useApplyForVacancy();

    const submitApplication: SubmitHandler<iApplication> = (values) => {
        apply({
            vacancy_id: props.vacancyId,
            cover_letter: values.cover_letter,
        })
        props.onClose();
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submitApplication)}>
                <Flex flexDirection={"column"}>
                    <Flex flexDirection="column">
                        <Text mb={"4px"} fontWeight={500}>ФИО</Text>
                        <Text>{createFullName(props.candidate.name, props.candidate.surname, props.candidate.patronymic)}</Text>
                    </Flex>

                    <Flex flexDirection="column" my={"20px"}>
                        <Text mb={"4px"} fontWeight={500}>Резюме</Text>
                        <Link
                            href={props.candidate.resume_url}
                            isExternal
                            fontSize={"18px"}
                            textDecoration={props.candidate.resume_url ? "underline" : "none"}
                            color={props.candidate.resume_url ? "auto" : "gray.500"}
                            opacity={props.candidate.resume_url ? 1 : 0.5}
                            cursor={props.candidate.resume_url ? "pointer" : "default"}
                            _hover={{
                                color: props.candidate.resume_url ? "purple.500" : "gray.500",
                            }}
                        >
                            {props.candidate.resume_url ? getResumeName(props.candidate.resume_url) : "отсутствует"}
                        </Link>
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
                        isLoading={isApplying}
                    >
                        Откликнуться
                    </Button>
                </Flex>
            </form>
        </FormProvider>
    )
}

export default ApplicationForm
