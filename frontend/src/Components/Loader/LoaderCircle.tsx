import React from "react";
import {Flex, Spinner} from "@chakra-ui/react";

const LoaderCircle = () => {

    return (
        <Flex height="30vh" alignItems="center" justifyContent="center" width={"100%"}>
            <Spinner color="purple.500" height="100px" width="100px" />
        </Flex>

    )
}

export default LoaderCircle