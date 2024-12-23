import React from "react";
import {Text, Flex, IconButton, Input, useToast, Button} from "@chakra-ui/react";
import {AttachmentIcon, DeleteIcon} from "@chakra-ui/icons";
import {useFormContext} from "react-hook-form";

type iProfileCV = {
    cv?: any;
    isEditMode: boolean;
}

const CandidateCV = (props: iProfileCV) => {
    const toast = useToast();
    const { register, setValue } = useFormContext();

    const handleCV = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // TODO: прописать проверку на формат файла если будут требования на беке

        if (file.size > 20000000) {
            toast({
                position: "bottom-left",
                title: "Ошибка",
                description: "Файл слишком большой. Пожалуйста, загрузите файл размером до 20Мб",
                status: "error",
                isClosable: true,
            });
            return;
        }

        setValue("cv", file);
    };

    return (
        <Flex flexDirection="column" mt={"16px"}>
            <Text
                fontWeight={600}
                fontSize={"20px"}
                mb={"12px"}
            >
                Резюме:
            </Text>
                <Flex alignItems="center">
                    <Text
                        fontSize={"18px"}
                        textDecoration={props.cv ? "underline" : "none"}
                        color={props.cv ? "auto" : "gray.500"}
                        opacity={props.cv ? 1 : 0.5}
                    >
                        {props.cv ? "название файла" : "отсутствует"}
                    </Text>
                    {props.isEditMode && (
                        <Flex ml={"12px"}>
                            <Button
                                aria-label={"Change CV"}
                                bgColor={"white"}
                                height={"24px"}
                                width={"28px"}
                                minWidth={"28px"}
                                p={0}
                                _hover={{ backgroundColor: "purple.50" }}
                                position={"relative"}
                            >
                                <AttachmentIcon color={"purple.500"} />
                                <Input
                                    {...register("cv")}
                                    cursor="pointer"
                                    onChange={handleCV}
                                    type="file"
                                    position="absolute"
                                    height="100%"
                                    width="100%"
                                    opacity="0"
                                />
                            </Button>
                            {props.cv && (
                                <IconButton
                                    aria-label={"Delete CV"}
                                    bgColor={"white"}
                                    height={"24px"}
                                    width={"28px"}
                                    minWidth={"28px"}
                                    ml={"4px"}
                                    _hover={{ backgroundColor: "red.50" }}
                                    icon={<DeleteIcon color={"red.500"} />}
                                />
                            )}
                        </Flex>
                    )}
                </Flex>
        </Flex>
    )
}

export default CandidateCV