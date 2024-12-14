import {iUser} from "@/pages/profile/Types/types";
import TextInput from "@/Components/TextInput";
import {Flex} from "@chakra-ui/react";
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
                placeholder={"не указана"}
            />
            <TextInput
                label={"Имя"}
                registerName={"name"}
                margins={"0 20px"}
                placeholder={"не указано"}
            />
            <TextInput
                label={"Отчество"}
                registerName={"patronymic"}
                placeholder={"не указано"}
            />
        </Flex>
    )
}

export default ProfileName;