import React from "react";
import {Text, Flex, Link, Input, useToast, Button} from "@chakra-ui/react";
import {AttachmentIcon, DeleteIcon} from "@chakra-ui/icons";
import {Controller, useFormContext} from "react-hook-form";
import createFormData from "@/pages/profile/Utils/createFormData";
import {useUploadCandidateResume} from "@/pages/profile/Hooks/useUploadCandidateResume";
import getResumeName from "@/Utils/Profile/getResumeName";

type iProfileCV = {
    cv?: any;
}

const CandidateCV = (props: iProfileCV) => {
    const toast = useToast();
    const { setValue, control } = useFormContext();
    const { mutate: uploadResume, isPending: isUploadingResume } = useUploadCandidateResume();

    const handleCV = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
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
        setValue("resume", file);
        uploadResume(createFormData("file", file));
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
                    <Link
                        href={props.cv}
                        isExternal
                        fontSize={"18px"}
                        textDecoration={props.cv ? "underline" : "none"}
                        color={props.cv ? "auto" : "gray.500"}
                        opacity={props.cv ? 1 : 0.5}
                        cursor={props.cv ? "pointer" : "default"}
                        _hover={{
                            color: props.cv ? "purple.500" : "gray.500",
                        }}
                    >
                        {props.cv ? getResumeName(props.cv) : "отсутствует"}
                    </Link>
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
                            <Controller
                                control={control}
                                name={"resume"}
                                render={({ field: { value, onChange, ...field } }) => {
                                    return (
                                        <Input
                                            {...field}
                                            value={value?.fileName}
                                            onChange={(event) => {
                                                handleCV(event);
                                                onChange(event?.target?.files?.[0]);
                                            }}
                                            cursor="pointer"
                                            type="file"
                                            position="absolute"
                                            height="100%"
                                            width="100%"
                                            opacity="0"
                                        />
                                    );
                                }}
                            />
                        </Button>
                        {/*{props.cv && (
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
                        )}*/}
                    </Flex>
                </Flex>
        </Flex>
    )
}

export default CandidateCV