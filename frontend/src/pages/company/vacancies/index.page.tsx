import {App, Vacancy as VacancyType} from '@/Types';
import Default from '@/Layouts/Default/Default';
import styles from "./indes.module.scss";
import { Button, Flex, Text } from '@chakra-ui/react';
import CreateVacancyModal from './Modules/CreateJobModal/CreateVacancyModal';
import { useVacancies } from './Hooks/useVacansies';
import { useUserStore } from '@/Zustand/UserStore/User';
import { User } from '@/Types/User/User';
import Vacancy from './Modules/Vacancy/Vanancy';

const IndexPage:App.Next.NextPage = () => {
    const {data} = useVacancies()
    const company = useUserStore((state) => state.company) as User.Company;
    const thisCompanyVacs = data?.filter((item) => item.company_id === company.id)

    return (
        <div className={styles.wrapper}>
            <Flex flexDirection={'column'} gap={'40px'}>
                <Flex width={'100%'} backgroundColor={'white'} padding={50}>
                    <Text fontSize={64} fontWeight={700} color={'#161439'}>
                        Мои вакансии
                    </Text>
                </Flex>
                <CreateVacancyModal/>
                <Flex flexDirection={'column'} gap={'20px'}>
                    {
                        data?.map((item) => {
                            return <Vacancy data={item} />
                        })
                    }
                </Flex>
            </Flex>
        </div>
    )
}

IndexPage.Role = ['auth'];
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