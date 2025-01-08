import {iEvent} from "@/pages/vacancies/Types/types";
import {Box, Flex, Heading, Text} from "@chakra-ui/react";
import React from "react";
import TagItem from "@/Components/TagItem";

type iEventItem = {
    event: iEvent;
}

const EventItem = (props: iEventItem) => {
    return (
        <Flex
            mb={"40px"}
            bgColor={"white"}
            borderRadius={"8px"}
            boxShadow={"0px 1px 2px 0px #0000000F, 0px 1px 3px 0px #0000001A"}
            py={"40px"}
            px={"50px"}
        >
            <Flex flexDirection={"column"} width={"100%"}>
                <Heading mb={"16px"} fontSize={"28px"}>
                    {props.event.name}
                </Heading>
                <Flex justifyContent={"space-between"}>
                    <Flex flexDirection="column">
                        <Flex>
                            <TagItem label={`Начало: ${new Date(props.event.starts_at).toLocaleDateString("ru-Ru")}`} mr={"10px"} />
                            <TagItem label={`Конец: ${new Date(props.event.ends_at).toLocaleDateString("ru-Ru")}`} />
                        </Flex>
                        <Text
                            mt={"16px"}
                            mb={"12px"}
                        >
                            {props.event.description}
                        </Text>
                    </Flex>
                    <Box
                        bgImage={props.event.img_url}
                        width={"120px"}
                        height={"80px"}
                        backgroundSize={"contain"}
                        alignSelf={"flex-end"}
                        ml={"12px"}
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default EventItem