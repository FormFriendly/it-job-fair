import {App} from '@/Types';
import Default from '@/Layouts/Default/Default';
import {Flex} from "@chakra-ui/react";
import styles from './index.module.scss';
import SearchHeader from "@/pages/vacancies/Modules/SearchHeader";
import {useVacancies} from "@/pages/vacancies/Hooks/useVacancies";
import VacancyTabs from "@/pages/vacancies/Modules/VacancyTabs";
import {useEvents} from "@/pages/vacancies/Hooks/useEvents";

const IndexPage:App.Next.NextPage = () => {
    const {data: vacancies, isPending: vacanciesLoading} = useVacancies();
    const {data: events, isPending: eventsLoading} = useEvents();

    return (
        <Flex
            flexDir={"column"}
            my={"40px"}
            width={"90%"}
            height={"100%"}
        >
            <Flex
                flexDirection={"column"}
                width={"60%"}
            >
                <SearchHeader />
                <VacancyTabs
                    vacanciesLoading={vacanciesLoading}
                    vacancies={vacancies}
                    eventsLoading={eventsLoading}
                    events={events}
                />
            </Flex>
        </Flex>
    )
}

IndexPage.getLayout = (children) => {
    return (
        <Default classes={{
            content: styles.layoutContent
        }}>
            {children}
        </Default>
    )
}

export default IndexPage