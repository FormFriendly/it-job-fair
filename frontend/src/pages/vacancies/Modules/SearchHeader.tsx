import React from "react";
import {Flex, Heading, Input, InputGroup, InputRightAddon} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";

const SearchHeader = () => {

    return (
        <Flex
            flexDirection="column"
            bgColor={"white"}
            borderRadius={"8px"}
            boxShadow={"0px 1px 2px 0px #0000000F, 0px 1px 3px 0px #0000001A"}
            p={"50px"}
        >
            <Heading mb={"20px"}>
                Найди работу мечты в IT
            </Heading>
            <InputGroup>
                <Input
                    focusBorderColor={"purple.500"}
                    borderColor={"purple.100"}
                    _hover={{
                        borderColor: "purple.500",
                    }}
                />
                <InputRightAddon
                    bgColor={"purple.100"}
                    borderWidth={0}
                    cursor={"pointer"}
                    _hover={{
                        backgroundColor: "purple.200",
                    }}
                    transition={"0.3s"}
                >
                    <SearchIcon />
                </InputRightAddon>
            </InputGroup>
        </Flex>
    )
}

export default SearchHeader