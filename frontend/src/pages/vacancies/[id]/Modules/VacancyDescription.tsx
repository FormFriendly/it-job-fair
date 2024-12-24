import React from "react";
import {Flex, Heading, Text} from "@chakra-ui/react";

type iVacancyDescription = {
    description?: string;
}

const VacancyDescription = (props: iVacancyDescription) => {

    return (
        <Flex
            flexDirection="column"
            mt={"40px"}
            bgColor={"white"}
            borderRadius={"8px"}
            boxShadow={"0px 1px 2px 0px #0000000F, 0px 1px 3px 0px #0000001A"}
            py={"40px"}
            px={"50px"}
        >
            <Heading mb={"24px"} fontSize={"28px"}>
                Описание вакансии
            </Heading>
            <Text fontSize={"18px"}>
                {props.description || "Нет описания"}
            </Text>
        </Flex>
    )
}

export default VacancyDescription
