import {App} from '@/Types';
import Default from '@/Layouts/Default/Default';
import {Flex, Text} from "@chakra-ui/react";
import styles from './index.module.scss';
import SearchHeader from "@/pages/vacancies/Modules/SearchHeader";
import {useVacancies} from "@/pages/vacancies/Hooks/useVacancies";
import VacancyTabs from "@/pages/vacancies/Modules/VacancyTabs";
import {useEvents} from "@/pages/vacancies/Hooks/useEvents";
import {useEffect, useState} from "react";
import {iQueryParams, iVacancy} from "@/pages/vacancies/Types/types";

const IndexPage:App.Next.NextPage = () => {
    const [vacancies, setVacancies] = useState<Array<iVacancy> | undefined>();
    const [searchParams, setSearchParams] = useState<iQueryParams>({ enabled: true });
    const {data: vacanciesData, isPending: vacanciesLoading} = useVacancies(searchParams);
    const {data: events, isPending: eventsLoading} = useEvents();

    useEffect(() => {
        setVacancies(vacanciesData)
    }, [vacanciesData])

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
                <SearchHeader setSearchParams={setSearchParams} isLoading={vacanciesLoading} />
                {vacancies && vacancies.length === 0 ? (
                    <Flex
                        mt={"40px"}
                        justifyContent={"center"}
                        width={"100%"}
                    >
                        <Text fontStyle={"italic"}>Вакансии по выбранным параметрам не найдены</Text>
                    </Flex>
                ) : (
                    <VacancyTabs
                        vacanciesLoading={vacanciesLoading}
                        vacancies={vacancies}
                        eventsLoading={eventsLoading}
                        events={events}
                    />
                )}
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