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
                <Input />
                <InputRightAddon>
                    <SearchIcon />
                </InputRightAddon>
            </InputGroup>
        </Flex>
    )
}

export default SearchHeader