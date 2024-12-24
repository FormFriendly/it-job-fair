import {App} from '@/Types';
import Default from '@/Layouts/Default/Default';
import {Flex} from "@chakra-ui/react";
import styles from "@/pages/login/index.module.scss";
import VacancyCard from "@/pages/vacancies/[id]/Modules/VacancyCard";
import VacancyDescription from "@/pages/vacancies/[id]/Modules/VacancyDescription";
import {useVacancyById} from "@/pages/vacancies/[id]/Hooks/useVacancyById";
import LoaderCircle from "@/Components/Loader/LoaderCircle";
import {useRouter} from "next/router";

const IndexPage:App.Next.NextPage = () => {
    const router = useRouter();
    const { data, isPending } = useVacancyById(router.query.id);

    return (
        <Flex
            flexDir={"column"}
            my={"40px"}
            width={"90%"}
            height={"100%"}
        >
            <Flex
                flexDirection={"column"}
                width={"100%"}
            >
                {isPending ? (<LoaderCircle />) : (
                    data && (
                        <>
                            <VacancyCard vacancy={data} />
                            <VacancyDescription description={data.description} />
                        </>
                    )
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