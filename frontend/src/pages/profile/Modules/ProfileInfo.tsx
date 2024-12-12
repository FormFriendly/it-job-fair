import React from "react";
import {Text, Flex, Button} from "@chakra-ui/react";
import {useProfile} from "@/pages/profile/Hooks/useProfile";
import {useUser} from "@/Hooks/User/useUser";

type iProfileInfo = {
}

const ProfileInfo = (props: iProfileInfo) => {

    return (
        <Flex
            flexDirection="column"
            alignItems={"center"}
            width={"268px"}
            mx={"24px"}
        >
            <Text></Text>
            <Button
                colorScheme={"purple"}
                height={"48px"}
                width={"100%"}
            >
                Загрузить новый аватар
            </Button>
        </Flex>
    )
}

export default ProfileInfo