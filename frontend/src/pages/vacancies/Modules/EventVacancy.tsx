import {Button, Flex, Text} from "@chakra-ui/react";
import {iVacancy} from "@/pages/vacancies/Types/types";
import Salary from "@/pages/vacancies/Modules/Salary";
import TagItem from "@/Components/TagItem";
import workModeTypes from "@/pages/vacancies/Utils/workModeTypes";
import experienceTypes from "@/pages/vacancies/Utils/experienceTypes";
import React from "react";
import {useRouter} from "next/router";

type iEventVacancy = {
    vacancy: iVacancy;
}

const EventVacancy = (props: iEventVacancy) => {
    const router = useRouter();

    function onVacancyClick(id: number) {
        router.push("/vacancies/" + id);
    }

    return (
        <Flex
            justifyContent={"space-between"}
            borderBottomWidth={"1px"}
            borderBottomColor={"purple.300"}
            mt={"16px"}
        >
            <Flex flexDir={"column"}>
                <Text fontSize={"18px"} fontWeight={600}>{props.vacancy.title}</Text>
                <Flex mt={"8px"} alignItems={"center"}>
                    <Salary
                        salaryType={props.vacancy.salary_type}
                        salary={props.vacancy.salary}
                        currency={props.vacancy.currency}
                        fontSize={"14px"}
                    />
                    <TagItem label={workModeTypes[props.vacancy.work_mode]} mx={"8px"} fontSize={"14px"} />
                    <TagItem label={experienceTypes[props.vacancy.experience]} fontSize={"14px"} />
                </Flex>
                <Flex mt={"8px"} mb={"16px"} flexDirection={"column"}>
                    <Text fontSize={"14px"}>{props.vacancy.company.name}, {props.vacancy.location}</Text>
                </Flex>
            </Flex>
            <Button
                alignSelf={"center"}
                colorScheme={"purple"}
                variant={"outline"}
                onClick={() => { onVacancyClick(props.vacancy.id) }}
            >
                Откликнуться
            </Button>
        </Flex>
    )
}

export default EventVacancy;