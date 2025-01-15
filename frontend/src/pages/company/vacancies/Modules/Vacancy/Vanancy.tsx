import { Vacancy as VacancyType } from "@/Types"
import { Flex, Text } from "@chakra-ui/react"
import { VacancyEngToRus } from "@/i18/VacancyEngToRus"
import { useApplications } from "./Hooks/GetApplications"
import { useRouter } from "next/router"
import Routes from "@/Routes/Routes"

type VacancyProps = {
    data: VacancyType.Vacancy.Item 
} & {
    isFirst?: boolean
}

const Vacancy = (props: VacancyProps) => {
    const router = useRouter()
    console.log(props.data, ' DATA')
    const {data: apps} = useApplications(String(props.data.id))
    console.log(apps, ' APPS ')
    const {data, isFirst} = props
    return (
        <Flex gap={'20px'} width={'100%'}>
            <Flex flexDirection={'column'} backgroundColor={'white'} padding={'40px 50px'} gap={'20px'} flex={1}> 
                <Text fontWeight={600} fontSize={36}>
                    {data.title}
                </Text>
                <Flex gap={'20px'}>
                    <Flex padding={'4px'} backgroundColor={'#E9D8FD'} borderRadius={8}>
                        <Text fontSize={18} color={'#44337A'}>Опыт: {VacancyEngToRus.getRusYears(data.experience)}</Text>
                    </Flex>
                    <Flex padding={'4px'} backgroundColor={'#E9D8FD'} borderRadius={8}>
                        <Text fontSize={18} color={'#44337A'}>Формат работы: {VacancyEngToRus.getRusWorkPlace(data.work_mode)}</Text>
                    </Flex>
                </Flex> 
                <Text fontSize={24} display={'flex'} gap={'10px'}>
                    {VacancyEngToRus.getRusSalaryType(data.salary_type)} 
                    <Text fontWeight={600}>
                        {data.salary}
                    </Text> 
                    {data.currency}
                </Text>
                <Text fontSize={24}>
                    {data.company.name}
                </Text>
                <Text fontSize={24}>
                    {data.location}
                </Text>
            </Flex>
            <Flex flexDirection={'column'} backgroundColor={'white'} padding={'40px 50px'} width={'40%'} gap={'20px'}> 
                <Text fontSize={30} fontWeight={600} textDecoration={'underline'} cursor={'pointer'} onClick={() => router.push(Routes.company.applications('16'))}>
                    Отклики: {isFirst ? 1 : 0}
                </Text>
                <Text fontSize={30} fontWeight={600}>
                    Статус вакансии: {VacancyEngToRus.getRusStatus(data.status)}
                </Text>
                <Text fontSize={24}>
                    {data.location}
                </Text>
            </Flex>
        </Flex>
    )
}

export default Vacancy