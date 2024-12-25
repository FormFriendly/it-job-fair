import {iProfileFormInputs, iCandidateUser} from "@/pages/profile/Types/types";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import CandidateName from "@/pages/profile/Modules/CandidateProfile/CandidateName";
import ProfileContacts from "@/pages/profile/Modules/ProfileContacts";
import CandidateCV from "@/pages/profile/Modules/CandidateProfile/CandidateCV";
import React, {useState} from "react";
import getTelegramNickname from "@/pages/profile/Utils/getTelegramNickname";
import ProfileImage from "@/pages/profile/Modules/ProfileImage";
import {Button, Flex} from "@chakra-ui/react";
import createTelegramUrl from "@/pages/profile/Utils/createTelegramUrl";
import {useUpdateCandidate} from "@/pages/profile/Hooks/useUpdateCandidate";
import {useUploadCandidateAvatar} from "@/pages/profile/Hooks/useUploadCandidateAvatar";
import createFormData from "@/pages/profile/Utils/createFormData";


type iProfileForm = {
    user: iCandidateUser
}

const CandidateProfileForm = (props: iProfileForm) => {
    const [isEditMode, setEditMode] = useState<boolean>(false);
    const { mutate: updateCandidate, isPending: isUpdatingCandidate } = useUpdateCandidate();
    const { mutate: uploadAvatar, isPending: isUploadingAvatar } = useUploadCandidateAvatar();

    function toggleEditMode() {
        reset();
        setEditMode(!isEditMode);
    }

    const methods = useForm<iProfileFormInputs>({
        mode: "all",
        defaultValues: {
            name: props.user.name,
            surname: props.user.surname,
            patronymic: props.user.patronymic,
            contact_email: props.user.contact_email,
            contact_phone: props.user.contact_phone,
            tg_link: getTelegramNickname(props.user.tg_link),
            avatar: null,
            resume: null
        }
    });
    const { handleSubmit, reset } = methods;

    const onProfileUpdate: SubmitHandler<iProfileFormInputs> = async (values) => {
        const avatar = values.avatar;
        const params = {...values, tg_link: createTelegramUrl(values.tg_link)}
        delete params.avatar;
        delete params.resume;
        updateCandidate(params);
        if (avatar) {
            uploadAvatar(createFormData("file", avatar));
        }
        setEditMode(!isEditMode);
    }

    return (
        <FormProvider {...methods}>
            <form style={{ width: "100%" }} onSubmit={handleSubmit(onProfileUpdate)} noValidate>
                <Flex justifyContent={"space-between"} width={"100%"}>
                    <ProfileImage isEditMode={isEditMode} imageSrc={props.user.avatar_path}/>
                    <Flex flexDirection="column" width={"70%"}>
                        <CandidateName isEditMode={isEditMode} />
                        <ProfileContacts isEditMode={isEditMode} />
                        <CandidateCV cv={props.user.resume_url} />
                        <Flex mt={"40px"} alignSelf={"flex-end"}>
                            <Button
                                colorScheme={isEditMode ? "red" : "purple"}
                                height={"48px"}
                                onClick={toggleEditMode}
                                variant={isEditMode ? "outline" : "solid"}
                                type="button"
                            >
                                {isEditMode ? "Отменить" : "Редактировать профиль"}
                            </Button>
                            {isEditMode && (
                                <Button
                                    colorScheme={"purple"}
                                    height={"48px"}
                                    ml={"20px"}
                                    type="submit"
                                    isLoading={isUpdatingCandidate || isUploadingAvatar}
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

export default CandidateProfileForm;