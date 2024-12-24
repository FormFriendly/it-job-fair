import {App} from '@/Types';
import Default from '@/Layouts/Default/Default';
import {Flex} from "@chakra-ui/react";
import styles from "@/pages/login/index.module.scss";
import {useVacancies} from "@/pages/vacancies/Hooks/useVacancies";
import VacancyCard from "@/pages/vacancies/[id]/Modules/VacancyCard";
import VacancyDescription from "@/pages/vacancies/[id]/Modules/VacancyDescription";

const mockVacancies = [
    {
        title: "Software Engineer",
        description: "Job description...",
        salary: 70000,
        salary_type: "from",
        currency: "USD",
        location: "New York",
        work_mode: "remote",
        employment_type: "full-time",
        experience: "1-2 years",
        status: "active",
        id: 0,
        company_id: 0,
        event_id: 0,
        specialization_id: 0,
        created_at: "2024-12-24T09:37:06.935Z",
        updated_at: "2024-12-24T09:37:06.935Z",
        skills: [
            {
                skill: "Python",
                id: 0
            }
        ],
        specialization: {
            name: "Software Development",
            id: 0
        }
    }
]

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
                width={"100%"}
            >
                <VacancyCard vacancy={mockVacancies[0]} />
                <VacancyDescription description={mockVacancies[0].description} />
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