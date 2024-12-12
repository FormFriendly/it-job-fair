import React from "react";
import {Avatar, Flex, Button} from "@chakra-ui/react";

type iProfileImage = {
    imageSrc?: string;
}

const ProfileImage = (props: iProfileImage) => {
    return (
        <Flex
            flexDirection="column"
            alignItems={"center"}
            width={"268px"}
            mx={"24px"}
        >
            <Avatar
                src={props.imageSrc || ""}
                bg="gray.400"
                width={"128px"}
                height={"128px"}
                mb={"40px"}
            />
            <Button
                variant={"outline"}
                colorScheme={"purple"}
                height={"48px"}
                width={"100%"}
            >
                Загрузить новый аватар
            </Button>
        </Flex>
    )
}

export default ProfileImage