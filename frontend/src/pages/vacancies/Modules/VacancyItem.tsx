import React from "react";
import {Button, Flex, Heading, Text} from "@chakra-ui/react";
import {iVacancy} from "@/pages/vacancies/Types/types";
import Salary from "@/pages/vacancies/Modules/Salary";
import TagItem from "@/Components/TagItem";
import workModeTypes from "@/pages/vacancies/Utils/workModeTypes";
import experienceTypes from "@/pages/vacancies/Utils/experienceTypes";

type iVacancyItem = {
    vacancy: iVacancy;
}

const VacancyItem = (props: iVacancyItem) => {

    return (
        <Flex
            mt={"40px"}
            flexDirection="column"
            bgColor={"white"}
            borderRadius={"8px"}
            boxShadow={"0px 1px 2px 0px #0000000F, 0px 1px 3px 0px #0000001A"}
            py={"40px"}
            px={"50px"}
        >
            <Heading mb={"16px"}>
                {props.vacancy.title}
            </Heading>
            <Flex>
                <Salary
                    salaryType={props.vacancy.salary_type}
                    salary={props.vacancy.salary}
                    currency={props.vacancy.currency}
                />
                <TagItem label={workModeTypes[props.vacancy.work_mode]} mx={"10px"} />
                <TagItem label={experienceTypes[props.vacancy.experience]} />
            </Flex>
            <Flex mt={"16px"} mb={"12px"}>
                <Text fontSize={"16px"}>{props.vacancy.location}</Text>
            </Flex>
            <Button
                colorScheme={"purple"}
                width={"230px"}
            >
                Откликнуться
            </Button>
        </Flex>
    )
}

export default VacancyItem
