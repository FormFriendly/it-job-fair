import React, {useState} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {iCompanyProfileInputs, iCompanyUser} from "@/pages/profile/Types/types";
import getTelegramNickname from "@/pages/profile/Utils/getTelegramNickname";
import ProfileImage from "@/pages/profile/Modules/ProfileImage";
import {Button, Flex} from "@chakra-ui/react";
import CompanyDetails from "@/pages/profile/Modules/CompanyProfile/CompanyDetails";
import ProfileContacts from "@/pages/profile/Modules/ProfileContacts";
import {useUpdateCompany} from "@/pages/profile/Hooks/useUpdateCompany";
import {useUploadCompanyLogo} from "@/pages/profile/Hooks/useUploadCompanyLogo";
import createTelegramUrl from "@/pages/profile/Utils/createTelegramUrl";
import createFormData from "@/pages/profile/Utils/createFormData";

type iCompanyProfileForm = {
    user: iCompanyUser
}

const CompanyProfileForm = (props: iCompanyProfileForm) => {
    const [isEditMode, setEditMode] = useState<boolean>(false);
    const { mutate: updateCompany, isPending: isUpdatingCompany } = useUpdateCompany();
    const { mutate: uploadLogo, isPending: isUploadingLogo } = useUploadCompanyLogo();

    const methods = useForm<iCompanyProfileInputs>({
        defaultValues: {
            name: props.user.name,
            website: props.user.website,
            location: props.user.location,
            description: props.user.description,
            contact_email: props.user.contact_email,
            contact_phone: props.user.contact_phone,
            tg_link: getTelegramNickname(props.user.tg_link),
            logo: null,
        }
    });

    const { handleSubmit, reset } = methods;

    function toggleEditMode() {
        reset();
        setEditMode(!isEditMode);
    }

    const onCompanyUpdate: SubmitHandler<iCompanyProfileInputs> = (values) => {
        const logo = values.logo;
        const params = {...values, tg_link: createTelegramUrl(values.tg_link)}
        delete params.logo;
        updateCompany(params);
        if (logo) {
            uploadLogo(createFormData("file", logo));
        }
        setEditMode(!isEditMode);
    }

    return  (
        <FormProvider {...methods}>
            <form style={{ width: "100%" }} onSubmit={handleSubmit(onCompanyUpdate)} noValidate>
                <Flex justifyContent={"space-between"} width={"100%"}>
                    <ProfileImage
                        isEditMode={isEditMode}
                        imageSrc={props.user.logo_path}
                        isCompany={true}
                    />
                    <Flex flexDirection="column" width={"70%"}>
                        <CompanyDetails isEditMode={isEditMode} />
                        <ProfileContacts isEditMode={isEditMode} />
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
                                    isLoading={isUpdatingCompany || isUploadingLogo}
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

export default CompanyProfileForm;