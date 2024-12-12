import React from "react";
import {Text, Flex, IconButton, Button} from "@chakra-ui/react";
import { DeleteIcon, DownloadIcon } from "@chakra-ui/icons";

type iProfileCV = {
    cv?: any;
}

const ProfileCV = (props: iProfileCV) => {

    return (
        <Flex flexDirection="column" ml={"64px"}>
            <Text
                fontWeight={600}
                fontSize={"24px"}
                mb={"12px"}
            >
                Резюме:
            </Text>
                {props.cv ? (
                    <>
                        <Text
                            fontSize={"18px"}
                            textDecoration={"underline"}
                        >
                            название файла
                        </Text>
                        <Flex mt={"8px"} justifyContent={"space-evenly"}>
                            <IconButton
                                aria-label={"Delete CV"}
                                bgColor={"white"}
                                _hover={{ backgroundColor: "red.50" }}
                                icon={<DeleteIcon color={"red.500"} />}
                            />
                            <IconButton
                                aria-label={"Change CV"}
                                bgColor={"white"}
                                _hover={{ backgroundColor: "purple.50" }}
                                icon={<DownloadIcon color={"purple.500"}/>}
                            />
                        </Flex>
                    </>
                ) : (
                    <Button
                        rightIcon={<DownloadIcon color={"purple.500"}/>}
                        variant={"outline"}
                        colorScheme={"purple"}
                    >
                        Загрузить резюме
                    </Button>
                )}
        </Flex>
    )
}

export default ProfileCV