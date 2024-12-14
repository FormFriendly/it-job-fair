import React from "react";
import {Text, Flex, IconButton} from "@chakra-ui/react";
import {AttachmentIcon, DeleteIcon} from "@chakra-ui/icons";

type iProfileCV = {
    cv?: any;
    isEditMode: boolean;
}

const ProfileCV = (props: iProfileCV) => {

    return (
        <Flex flexDirection="column" mt={"32px"}>
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
                        textDecoration={"underline"}
                        color={props.cv ? "auto" : "gray.400"}
                    >
                        {props.cv ? "название файла" : "отсутствует"}
                    </Text>
                    {props.isEditMode && (
                        <Flex ml={"12px"}>
                            <IconButton
                                aria-label={"Change CV"}
                                bgColor={"white"}
                                height={"24px"}
                                width={"28px"}
                                minWidth={"28px"}
                                _hover={{ backgroundColor: "purple.50" }}
                                icon={<AttachmentIcon color={"purple.500"}/>}
                            />
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

export default ProfileCV