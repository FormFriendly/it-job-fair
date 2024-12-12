import React from "react";
import {Text, Flex, Button} from "@chakra-ui/react";
import ProfileContacts from "@/pages/profile/Modules/ProfileContacts";
import createFullName from "@/pages/profile/Utils/createFullName";
import ProfileCV from "@/pages/profile/Modules/ProfileCV";

type iProfileInfo = {
}

const mockUser = {
    name: "John",
    surname: "Doe",
    patronymic: "Doevich",
    date_of_birth: "1990-01-01",
    phone: "+123456789",
    avatar_path: "/avatars/johndoe.png",
    tg_link: "https://t.me/johndoe",
    id: 0,
    user_id: 0,
    created_at: "2024-12-12T13:40:42.083Z",
    updated_at: "2024-12-12T13:40:42.083Z"
}

const ProfileInfo = (props: iProfileInfo) => {

    return (
        <Flex
            flexDirection="column"
        >
            <Text
                fontWeight={600}
                fontSize={"36px"}
                mb={"12px"}
            >
                {createFullName(mockUser.name, mockUser.surname, mockUser.patronymic)}
            </Text>
            <Flex>
                <ProfileContacts user={mockUser} />
                <ProfileCV />
            </Flex>
            <Button
                colorScheme={"purple"}
                height={"48px"}
                mt={"40px"}
            >
                Редактировать профиль
            </Button>
        </Flex>
    )
}

export default ProfileInfo