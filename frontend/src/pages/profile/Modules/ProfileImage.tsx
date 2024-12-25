import React, {useState} from "react";
import {Avatar, Flex, Button, Input, useToast} from "@chakra-ui/react";
import {Controller, useFormContext} from "react-hook-form";

type iProfileImage = {
    imageSrc?: string;
    isEditMode: boolean;
    isCompany?: boolean;
}

const ProfileImage = (props: iProfileImage) => {
    const toast = useToast();
    const { control, setValue } = useFormContext();
    const [previewImage, setPreviewImage] = useState<string>("");

    const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (!file.type.includes('image')) {
            toast({
                position: "bottom-left",
                title: "Ошибка",
                description: "Неверный формат фото. Пожалуйста, загрузите фото в формате .jpg или .png",
                status: "error",
                isClosable: true,
            });
            return;

        }
        if (file.size > 20000000) {
            toast({
                position: "bottom-left",
                title: "Ошибка",
                description: "Фото слишком большое. Пожалуйста, загрузите фото размером до 20Мб",
                status: "error",
                isClosable: true,
            });
            return;
        }

        const urlImage = URL.createObjectURL(file);
        setPreviewImage(urlImage);
        setValue(props.isCompany ? "logo" : "avatar", file);
    };

    return (
        <Flex
            flexDirection="column"
            alignItems={"center"}
            mr={"24px"}
            width={"20%"}
        >
            <Avatar
                src={previewImage || props.imageSrc || ""}
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
                {props.isCompany ? "Загрузить новый логотип" : "Загрузить новый аватар"}
                <Controller
                    control={control}
                    name={props.isCompany ? "logo" : "avatar"}
                    render={({ field: { value, onChange, ...field } }) => {
                        return (
                            <Input
                                {...field}
                                value={value?.fileName}
                                onChange={(event) => {
                                    handleImage(event);
                                    onChange(event?.target?.files?.[0]);
                                }}
                                cursor="pointer"
                                type="file"
                                position="absolute"
                                height="100%"
                                width="100%"
                                opacity="0"
                                accept="image/*"
                            />
                        );
                    }}
                />
            </Button>}
        </Flex>
    )
}

export default ProfileImage