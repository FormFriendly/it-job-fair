import React from "react";
import {Text, Flex} from "@chakra-ui/react";
import {iUser} from "@/pages/profile/Types/types";
import getTelegramNickname from "@/pages/profile/Utils/getTelegramNickname";

type iProfileContacts = {
    user: iUser
}

const ProfileContacts = (props: iProfileContacts) => {

    return (
        <Flex flexDirection="column">
            <Text
                fontWeight={600}
                fontSize={"24px"}
                mb={"12px"}
            >
                Контакты:
            </Text>
            <Text
                fontSize={"18px"}
                color={props.user.email ? "auto" : "gray.400"}
            >
                <Text as={"span"} fontWeight={600} mr={"6px"} color={"gray.800"}>
                    Email:
                </Text>
                {props.user.email || "не указан"}
            </Text>
            <Text fontSize={"18px"}>
                <Text as={"span"} fontWeight={600} mr={"6px"}>
                    Телефон:
                </Text>
                {props.user.phone || "не указан"}
            </Text>
            <Text fontSize={"18px"}>
                <Text as={"span"} fontWeight={600} mr={"6px"}>
                    Telegram:
                </Text>
                {props.user.tg_link ? getTelegramNickname(props.user.tg_link) : "не указан"}
            </Text>
        </Flex>
    )
}

export default ProfileContacts