import React from "react";
import {Text, Flex, IconButton} from "@chakra-ui/react";
import { DeleteIcon, DownloadIcon } from "@chakra-ui/icons";

type iProfileCV = {
}

const ProfileCV = (props: iProfileCV) => {

    return (
        <Flex flexDirection="column" ml={"64px"}>
            <Text
                fontWeight={600}
                fontSize={"24px"}
            >
                Резюме:
            </Text>
            <Flex alignItems="center">
                <Text
                    fontSize={"18px"}
                    textDecoration={"underline"}
                >
                    название файла
                </Text>
                <Flex ml={"16px"}>
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
            </Flex>
        </Flex>
    )
}

export default ProfileCV