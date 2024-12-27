import {App} from '@/Types';
import Default from '@/Layouts/Default/Default';
import {Flex} from "@chakra-ui/react";
import styles from './index.module.scss';
import SearchHeader from "@/pages/vacancies/Modules/SearchHeader";
import VacancyList from "@/pages/vacancies/Modules/VacancyList";
import {useVacancies} from "@/pages/vacancies/Hooks/useVacancies";
import LoaderCircle from "@/Components/Loader/LoaderCircle";

const IndexPage:App.Next.NextPage = () => {
    const {data, isPending} = useVacancies();

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
                {isPending ? (<LoaderCircle />) : (data && <VacancyList vacancies={data}/>)}
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