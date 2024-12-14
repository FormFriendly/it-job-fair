import React from "react";
import {Text, Flex} from "@chakra-ui/react";
import {iUser} from "@/pages/profile/Types/types";
import getTelegramNickname from "@/pages/profile/Utils/getTelegramNickname";
import TextInput from "@/Components/TextInput";

type iProfileContacts = {
    user: iUser
}

const ProfileContacts = (props: iProfileContacts) => {

    return (
        <Flex flexDirection="column" mt={"32px"}>
            <Text
                fontWeight={600}
                fontSize={"20px"}
                mb={"12px"}
            >
                Контакты:
            </Text>
            <Flex>
                <TextInput
                    label={"Email"}
                    registerName={"email"}
                    placeholder={"не указан"}
                />
                <TextInput
                    label={"Телефон"}
                    registerName={"phone"}
                    margins={"0 20px"}
                />
                <TextInput
                    label={"Telegram"}
                    registerName={"telegram"}
                />
            </Flex>
        </Flex>
    )
}

export default ProfileContacts