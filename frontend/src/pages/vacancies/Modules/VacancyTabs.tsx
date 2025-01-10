import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import LoaderCircle from "@/Components/Loader/LoaderCircle";
import VacancyList from "@/pages/vacancies/Modules/VacancyList";
import {iEvent, iVacancy} from "@/pages/vacancies/Types/types";
import EventList from "@/pages/vacancies/Modules/EventList";

type iVacancyTabs = {
    vacancies?: Array<iVacancy>;
    vacanciesLoading?: boolean;
    events?: Array<iEvent>;
    eventsLoading?: boolean;
}

const VacancyTabs = (props: iVacancyTabs) => {
    return (
        <Tabs
            mt={"40px"}
            variant={"solid-rounded"}
            colorScheme={"purple"}
        >
            <TabList>
                <Tab fontWeight={500}>
                    {"Вакасии"}{props.vacancies ? ` - ${props.vacancies?.length}` : ""}
                </Tab>
                <Tab fontWeight={500} ml={"12px"}>
                    {"Мероприятия"}{props.events ? ` - ${props.events?.length}` : ""}
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel p={0} mt={"24px"}>
                    {props.vacanciesLoading ? (<LoaderCircle />) : (props.vacancies && <VacancyList vacancies={props.vacancies}/>)}
                </TabPanel>
                <TabPanel p={0} mt={"24px"}>
                    {props.eventsLoading ? (<LoaderCircle />) : (props.events && <EventList events={props.events}/>)}
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default VacancyTabs;