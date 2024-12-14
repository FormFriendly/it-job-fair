import {iUser} from "@/pages/profile/Types/types";
import TextInput from "@/Components/TextInput";
import {Flex, Text} from "@chakra-ui/react";
import React from "react";


type iProfileName = {
    user: iUser
}

const ProfileName = (props: iProfileName) => {

    return (
        <Flex width={"100%"}>
            <TextInput
                label={"Фамилия"}
                registerName={"surname"}
            />
            <TextInput
                label={"Имя"}
                registerName={"name"}
                margins={"0 20px"}
            />
            <TextInput
                label={"Отчество"}
                registerName={"patronymic"}
            />
        </Flex>
    )
}

export default ProfileName;