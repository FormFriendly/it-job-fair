import {IProfileFormInputs, iUser} from "@/pages/profile/Types/types";
import {FormProvider, useForm} from "react-hook-form";
import ProfileName from "@/pages/profile/Modules/ProfileName";
import ProfileContacts from "@/pages/profile/Modules/ProfileContacts";
import ProfileCV from "@/pages/profile/Modules/ProfileCV";
import React, {useState} from "react";
import getTelegramNickname from "@/pages/profile/Utils/getTelegramNickname";
import ProfileImage from "@/pages/profile/Modules/ProfileImage";
import {Button, Flex} from "@chakra-ui/react";


type iProfileForm = {
    user: iUser
}

const ProfileForm = (props: iProfileForm) => {
    const [isEditMode, setEditMode] = useState<boolean>(false);

    function toggleEditMode() {
        setEditMode(!isEditMode);
    }

    const methods = useForm<IProfileFormInputs>({
        defaultValues: {
            surname: props.user.surname,
            name: props.user.name,
            patronymic: props.user.patronymic,
            email: props.user.email,
            phone: props.user.phone,
            telegram: getTelegramNickname(props.user.tg_link),
            avatar_path: props.user.avatar_path,
        }
    });

    return (
        <FormProvider {...methods}>
            <form style={{ width: "100%" }}>
                <Flex justifyContent={"space-between"} width={"100%"}>
                    <ProfileImage isEditMode={isEditMode} />
                    <Flex flexDirection="column" width={"70%"}>
                        <ProfileName user={props.user}/>
                        <ProfileContacts user={props.user} />
                        <ProfileCV isEditMode={isEditMode} cv={"test"}/>
                        <Flex mt={"40px"} alignSelf={"flex-end"}>
                            <Button
                                colorScheme={isEditMode ? "red" : "purple"}
                                height={"48px"}
                                onClick={toggleEditMode}
                                variant={isEditMode ? "outline" : "solid"}
                            >
                                {isEditMode ? "Отменить" : "Редактировать профиль"}
                            </Button>
                            {isEditMode && (
                                <Button
                                    colorScheme={"purple"}
                                    height={"48px"}
                                    ml={"20px"}
                                >
                                    Сохранить изменения
                                </Button>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </form>
        </FormProvider>

    )
}

export default ProfileForm;