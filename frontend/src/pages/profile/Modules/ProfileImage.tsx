import React from "react";
import {Avatar, Flex, Button} from "@chakra-ui/react";

type iProfileImage = {
    imageSrc?: string;
    isEditMode: boolean;
}

const ProfileImage = (props: iProfileImage) => {
    return (
        <Flex
            flexDirection="column"
            alignItems={"center"}
            mr={"24px"}
            width={"20%"}
        >
            <Avatar
                src={props.imageSrc || ""}
                bg="gray.400"
                width={"128px"}
                height={"128px"}
                mb={"40px"}
            />
            {props.isEditMode && <Button
                variant={"outline"}
                colorScheme={"purple"}
                height={"48px"}
                width={"100%"}
            >
                Загрузить новый аватар
            </Button>}
        </Flex>
    )
}

export default ProfileImage