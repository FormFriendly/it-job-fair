import {App} from '@/Types';
import Default from '@/Layouts/Default/Default';
import {Flex} from "@chakra-ui/react";
import styles from "@/pages/login/index.module.scss";
import SearchHeader from "@/pages/vacancies/Modules/SearchHeader";
import VacancyList from "@/pages/vacancies/Modules/VacancyList";
import {useVacancies} from "@/pages/vacancies/Hooks/useVacancies";

const IndexPage:App.Next.NextPage = () => {
    const {data, isPending, isSuccess, isError} = useVacancies();

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
                <VacancyList />
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