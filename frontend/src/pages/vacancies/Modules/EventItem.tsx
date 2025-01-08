import {iEvent, iVacancy} from "@/pages/vacancies/Types/types";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem, AccordionPanel,
    Box,
    Flex,
    Heading,
    Link, Spinner,
    Text
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import TagItem from "@/Components/TagItem";
import {useEventVacancies} from "@/pages/vacancies/Hooks/useEventVacancies";
import EventVacancy from "@/pages/vacancies/Modules/EventVacancy";

type iEventItem = {
    event: iEvent;
}

const EventItem = (props: iEventItem) => {
    const [eventId, setEventId] = useState<string>("");
    const [vacancies, setVacancies] = useState<Array<iVacancy> | null>(null);

    const {data, isPending} = useEventVacancies({id: eventId, enabled: !!eventId});

    function showVacancies(id: number) {
        if (vacancies) return;
        setEventId(String(id));
    }

    useEffect(() => {
        if (!data) return;
        setVacancies(data);
    }, [data])

    const Vacancies = () => {
        return (
            <>
                {!vacancies || vacancies.length === 0 ? <Text fontStyle={"italic"}>Вакансии не найдены</Text>
                    : vacancies.map((vacancy) => <EventVacancy key={vacancy.id} vacancy={vacancy} />)
                }
            </>
        )
    }

    return (
        <Accordion
            mb={"40px"}
            bgColor={"white"}
            borderRadius={"8px"}
            boxShadow={"0px 1px 2px 0px #0000000F, 0px 1px 3px 0px #0000001A"}
            py={"40px"}
            px={"50px"}
            allowToggle
        >
            <AccordionItem border={0}>
                {({ isExpanded }) => (
                    <>
                        <Flex flexDirection={"column"} width={"100%"}>
                            <Heading mb={"16px"} fontSize={"28px"}>
                                {props.event.name}
                            </Heading>
                            <Flex justifyContent={"space-between"}>
                                <Flex flexDirection="column">
                                    <Flex>
                                        <TagItem label={`Начало: ${new Date(props.event.starts_at).toLocaleDateString("ru-RU")}`} mr={"10px"} />
                                        <TagItem label={`Конец: ${new Date(props.event.ends_at).toLocaleDateString("ru-RU")}`} />
                                    </Flex>
                                    <Text
                                        mt={"16px"}
                                        mb={"12px"}
                                    >
                                        {props.event.description}
                                    </Text>
                                    <AccordionButton
                                        as={Link}
                                        onClick={() => {
                                            if (isExpanded) return null;
                                            showVacancies(props.event.id)
                                        }}
                                        p={0}
                                        _hover={{
                                            backgroundColor: "transparent",
                                            color: "purple.600"
                                        }}
                                        fontWeight={500}
                                        fontSize={"18px"}
                                        color={"purple.500"}
                                    >
                                        {isExpanded ? "Скрыть вакансии" : "Раскрыть вакансии"}
                                        <AccordionIcon />
                                    </AccordionButton>
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
                        <AccordionPanel p={0} mt={"8px"}>
                            {isPending ? <Spinner color="purple.500" /> : <Vacancies />}
                        </AccordionPanel>
                    </>
            )}
            </AccordionItem>
        </Accordion>
    )
}

export default EventItem