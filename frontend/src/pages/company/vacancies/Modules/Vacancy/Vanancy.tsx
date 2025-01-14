import { Vacancy as VacancyType } from "@/Types"
import { Flex, Text } from "@chakra-ui/react"

type VacancyProps = {
    data: VacancyType.Vacancy.Item
}

const getRusSalaryType = (type: string) => {
    if (type === 'from') return 'от'
    return "до"
}

const getRusStatus = (status: string) => {
    if (status === 'active') return 'Активная'
    if (status === 'closed') return 'Закрытая'
    return 'В архиве'
}

const getRusWorkPlace = (workPlace: string) => {
    if (workPlace === "remote") return "Удаленно";
    if (workPlace === "office") return "В офисе";
    if (workPlace === "hybrid") return "Гибрид";
}

const getRusYears = (years: string) => {
    if (years === "no experience") return "Без опыта";
    if (years === "less than year") return "Меньше года";
    if (years === "1-2 years") return "1-2 года";
    if (years === "3-4 years") return "3-4 года";
    if (years === "5+ years") return "5+ лет";
}

const Vacancy = (props: VacancyProps) => {
    const {data} = props
    console.log(data)
    return (
        <Flex gap={'20px'} width={'100%'}>
            <Flex flexDirection={'column'} backgroundColor={'white'} padding={'40px 50px'} gap={'20px'} flex={1}> 
                <Text fontWeight={600} fontSize={36}>
                    {data.title}
                </Text>
                <Flex gap={'20px'}>
                    <Flex padding={'4px'} backgroundColor={'#E9D8FD'} borderRadius={8}>
                        <Text fontSize={18} color={'#44337A'}>Опыт: {getRusYears(data.experience)}</Text>
                    </Flex>
                    <Flex padding={'4px'} backgroundColor={'#E9D8FD'} borderRadius={8}>
                        <Text fontSize={18} color={'#44337A'}>Формат работы: {getRusWorkPlace(data.work_mode)}</Text>
                    </Flex>
                </Flex> 
                <Text fontSize={24} display={'flex'} gap={'10px'}>
                    {getRusSalaryType(data.salary_type)} 
                    <Text fontWeight={600}>
                        {data.salary}
                    </Text> 
                    {data.currency}
                </Text>
                <Text fontSize={24}>
                    {data.location}
                </Text>
            </Flex>
            <Flex flexDirection={'column'} backgroundColor={'white'} padding={'40px 50px'} width={'40%'} gap={'20px'}> 
                <Text fontSize={30} fontWeight={600}>
                    Статус вакансии: {getRusStatus(data.status)}
                </Text>
                <Text fontSize={24}>
                    {data.location}
                </Text>
            </Flex>
        </Flex>
    )
}

export default Vacancy