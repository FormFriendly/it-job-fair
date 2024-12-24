import React from "react";
import {Button, Flex, Heading, Text} from "@chakra-ui/react";
import Salary from "@/pages/vacancies/Modules/Salary";
import TagItem from "@/Components/TagItem";
import workModeTypes from "@/pages/vacancies/Utils/workModeTypes";
import experienceTypes from "@/pages/vacancies/Utils/experienceTypes";
import {iVacancy} from "@/pages/vacancies/Types/types";
import employmentTypes from "@/pages/vacancies/Utils/employmentTypes";

type iVacancyCard = {
    vacancy: iVacancy;
}

const VacancyCard = (props: iVacancyCard) => {

    return (
        <Flex
            bgColor={"white"}
            borderRadius={"8px"}
            boxShadow={"0px 1px 2px 0px #0000000F, 0px 1px 3px 0px #0000001A"}
            py={"40px"}
            px={"50px"}
            justifyContent={"space-between"}
        >
            <Flex flexDirection="column">
                <Heading mb={"28px"}>
                    {props.vacancy.title}
                </Heading>
                <Salary
                    salaryType={props.vacancy.salary_type}
                    salary={props.vacancy.salary}
                    currency={props.vacancy.currency}
                    fontSize={"22px"}
                />
                <Text
                    mt={"24px"}
                    mb={"8px"}
                    fontSize={"24px"}
                    fontWeight={600}
                >
                    Требования
                </Text>
                <Flex>
                    <TagItem label={experienceTypes[props.vacancy.experience]} />
                    {props.vacancy.skills.map((item) => (
                        <TagItem label={item.skill} key={item.id} ml={"10px"}/>
                    ))}
                </Flex>
                <Text
                    mt={"24px"}
                    mb={"8px"}
                    fontSize={"24px"}
                    fontWeight={600}
                >
                    Местоположение и тип занятости
                </Text>
                <Flex>
                    {props.vacancy.location && <TagItem label={props.vacancy.location} mr={"10px"} />}
                    <TagItem label={workModeTypes[props.vacancy.work_mode]} mr={"10px"} />
                    <TagItem label={employmentTypes[props.vacancy.employment_type]} />
                </Flex>
            </Flex>
            <Button
                colorScheme={"purple"}
                alignSelf={"flex-end"}
                width={"220px"}
                height={"48px"}
                fontSize={"18px"}
            >
                Откликнуться
            </Button>
        </Flex>
    )
}

export default VacancyCard