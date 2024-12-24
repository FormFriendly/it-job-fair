import {App} from '@/Types';
import Default from '@/Layouts/Default/Default';
import {Flex} from "@chakra-ui/react";
import styles from "@/pages/login/index.module.scss";
import VacancyCard from "@/pages/vacancies/[id]/Modules/VacancyCard";
import VacancyDescription from "@/pages/vacancies/[id]/Modules/VacancyDescription";
import {useVacancyById} from "@/pages/vacancies/[id]/Hooks/useVacancyById";
import LoaderCircle from "@/Components/Loader/LoaderCircle";
import {useRouter} from "next/router";
import getSingleQueryValue from "@/pages/vacancies/[id]/Utils/getSingleQueryValue";

const IndexPage:App.Next.NextPage = () => {
    const router = useRouter();
    const id = getSingleQueryValue(router.query.id) || "1";
    const { data, isPending } = useVacancyById(id);

    if (router.query.id === undefined) {
        router.push("/vacancies");
    }

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