import React, { useState } from "react";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    Textarea,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    CheckboxGroup,
    Checkbox
} from "@chakra-ui/react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useCreateVacancy } from "../../Hooks/useCreateVacancy";
import { useSkills } from "@/Hooks/Common/useSkills";
import { useSpecializations } from "@/Hooks/Common/useSpecializations";
import { useEvents } from "@/pages/vacancies/Hooks/useEvents";

export type iCreateVacancy = {
    title: string;
    description: string;
    salary: number;
    salary_type: string;
    currency: string;
    location: string;
    work_mode: string;
    employment_type: string;
    experience: string;
    status: string;
    event_id: number;
    specialization_id: number;
    skills_ids: number[];
};

const CreateVacansyModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {data: skills} = useSkills()
    const {data: specializations} = useSpecializations()
    const {data: events} = useEvents()
    const { mutate: createVacancy } = useCreateVacancy();

    const methods = useForm<iCreateVacancy>({
        defaultValues: {
            title: "",
            description: "",
            salary: 0,
            salary_type: "from",
            currency: "USD",
            location: "",
            work_mode: "remote",
            employment_type: "full-time",
            experience: "1-2 years",
            status: "active",
            event_id: 0,
            specialization_id: 1,
            skills_ids: [],
        }
    });

    const { handleSubmit } = methods;

    const submitJobData: SubmitHandler<iCreateVacancy> = (values) => {
        createVacancy(values);
        setIsOpen(false);
    };

    return (
        <>
            <Button onClick={() => setIsOpen(true)} backgroundColor={'#805AD5'} textAlign={'center'} width={'100%'} borderRadius={6} height={'80px'} _hover={{backgroundColor: '#8b5AD5'}}>
                <Text color={'white'} fontWeight={600} fontSize={36}>
                    Добавить новую вакансию
                </Text>
            </Button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent minWidth={'80%'}>
                    <ModalHeader>Создать вакансию</ModalHeader>
                    <ModalCloseButton />
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(submitJobData)}>
                            <ModalBody>
                                <Flex flexDirection={"column"}>
                                    <FormControl mb={4}>
                                        <FormLabel htmlFor="title">Название вакансии</FormLabel>
                                        <Input id="title" placeholder="Разработчик Frontend" {...methods.register("title")} />
                                    </FormControl>

                                    <FormControl mb={4}>
                                        <FormLabel htmlFor="description">Описание</FormLabel>
                                        <Textarea id="description" placeholder="Описание вакансии" {...methods.register("description")} />
                                    </FormControl>

                                    <FormControl mb={4}>
                                        <FormLabel htmlFor="salary">Зарплата</FormLabel>
                                        <Input type="number" id="salary" placeholder="70000" {...methods.register("salary")} />
                                    </FormControl>

                                    <FormControl mb={4}>
                                        <FormLabel htmlFor="salary_type">Тип зарплаты</FormLabel>
                                        <Select id="salary_type" {...methods.register("salary_type")}>
                                            <option value="from">От</option>
                                            <option value="to">До</option>
                                        </Select>
                                    </FormControl>

                                    <FormControl mb={4}>
                                        <FormLabel htmlFor="currency">Валюта</FormLabel>
                                        <Select id="currency" {...methods.register("currency")}>
                                            <option value="RUB">RUB</option>
                                            <option value="USD">USD</option>
                                            <option value="EUR">EUR</option>
                                        </Select>
                                    </FormControl>

                                    <FormControl mb={4}>
                                        <FormLabel htmlFor="location">Локация</FormLabel>
                                        <Input id="location" placeholder="Москва" {...methods.register("location")} />
                                    </FormControl>

                                    <FormControl mb={4}>
                                        <FormLabel htmlFor="work_mode">Режим работы</FormLabel>
                                        <Select id="work_mode" {...methods.register("work_mode")}>
                                            <option value="remote">Удаленно</option>
                                            <option value="office">В офисе</option>
                                            <option value="hybrid">Гибрид</option>
                                        </Select>
                                    </FormControl>

                                    <FormControl mb={4}>
                                        <FormLabel htmlFor="employment_type">Тип занятости</FormLabel>
                                        <Select id="employment_type" {...methods.register("employment_type")}>
                                            <option value="full-time">Полная занятость</option>
                                            <option value="part-time">Частичная занятость</option>
                                        </Select>
                                    </FormControl>

                                    <FormControl mb={4}>
                                        <FormLabel htmlFor="experience">Опыт работы</FormLabel>
                                        <Select id="experience" {...methods.register("experience")}>
                                            <option value="no experience">Без опыта</option>
                                            <option value="less than year">Меньше года</option>
                                            <option value="1-2 years">1-2 года</option>
                                            <option value="3-4 years">3-4 года</option>
                                            <option value="5+ years">5+ лет</option>
                                        </Select>
                                    </FormControl>

                                    <FormControl mb={4}>
                                        <FormLabel htmlFor="status">Статус вакансии</FormLabel>
                                        <Select id="status" {...methods.register("status")}>
                                            <option value="active">Активная</option>
                                            <option value="closed">Закрытая</option>
                                            <option value="archived">В архиве</option>
                                        </Select>
                                    </FormControl>

                                    <FormControl mb={4}>
                                        <FormLabel htmlFor="event_id">ID события</FormLabel>
                                        <Select id="event_id" {...methods.register("event_id")}>
                                            {events && events.map(spec => (
                                                <option key={spec.id} value={spec.id}>
                                                    {spec.name}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl mb={4}>
                                        <FormLabel htmlFor="specialization_id">Специализация</FormLabel>
                                        <Select id="specialization_id" {...methods.register("specialization_id")}>
                                            {specializations && specializations.map(spec => (
                                                <option key={spec.id} value={spec.id}>
                                                    {spec.name}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    {/* Поле для выбора навыков */}
                                    <FormControl mb={4}>
                                        <FormLabel>Навыки (выберите все подходящие)</FormLabel>
                                        <CheckboxGroup onChange={(value) => methods.setValue('skills_ids', value.map(Number))}>
                                            {skills && skills.map(skill => (
                                                <Checkbox paddingLeft={'8px'} key={skill.id} value={skill.id.toString()}>
                                                    {skill.skill}
                                                </Checkbox>
                                            ))}
                                        </CheckboxGroup>
                                    </FormControl>

                                </Flex>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme={"purple"} type="submit">
                                    Создать вакансию
                                </Button>
                                <Button onClick={() => setIsOpen(false)} ml={3}>Закрыть</Button>
                            </ModalFooter>
                        </form>
                    </FormProvider>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateVacansyModal;
