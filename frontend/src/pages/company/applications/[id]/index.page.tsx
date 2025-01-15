import {App, Vacancy as VacancyType} from '@/Types';
import Default from '@/Layouts/Default/Default';
import styles from "./indes.module.scss";
import { Button, Flex, Text } from '@chakra-ui/react';
import { useUserStore } from '@/Zustand/UserStore/User';
import { User } from '@/Types/User/User';

const IndexPage:App.Next.NextPage = () => {
    // const {data} = useVacancies()
    const company = useUserStore((state) => state.company) as User.Company;
    const fakeDownload = () => {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(new Blob([new Uint8Array(317)]));
          link.download = 'resume_egorushlin.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
    }
    return (
        <div className={styles.wrapper}>
            <Flex flexDirection={'column'} gap={'40px'}>
                <Flex width={'100%'} backgroundColor={'white'} padding={50}>
                    <Text fontSize={64} fontWeight={700} color={'#161439'}>
                        Отклики на вакансию
                    </Text>
                </Flex>
                <Flex flexDirection={'column'} gap={'20px'}>
                <Flex flexDirection={'column'} gap={'8px'} border={'1px'} borderColor={'black'} padding={'20px'} borderRadius={'8px'} backgroundColor={'white'}>
                    <Text fontWeight={600}
                    fontSize={32}>
                        Егорушкин Александр Сергеевич
                    </Text>
                    <Text color={'blue'} fontWeight={500} fontSize={24} cursor={'pointer'} onClick={() => fakeDownload()}>
                        Резюме: Егорушкин.pdf
                    </Text>
                    <Text fontSize={24}>
                        Это мое большое сопроводительное письмо,
                        мой контакт +79850131200
                    </Text>
                </Flex>
                {/* {
                    thisCompanyVacs?.map((item, index) => {
                        return <Vacancy isFirst={index === 1} data={item} key={item.id}/>
                    })
                } */}
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