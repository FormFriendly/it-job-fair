import React, {useState} from "react";
import {Avatar, Flex, Button, Input, useToast} from "@chakra-ui/react";
import {useFormContext} from "react-hook-form";

type iProfileImage = {
    imageSrc?: string;
    isEditMode: boolean;
}

const ProfileImage = (props: iProfileImage) => {
    const toast = useToast();
    const { register, setValue } = useFormContext();
    const [previewImage, setPreviewImage] = useState<string>("");

    // TODO: временный вариант, возможно нужно будет сделать отправку ссылки вместо файла
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
        setValue("avatar_path", file);
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
                Загрузить новый аватар
                <Input
                    {...register("avatar_path")}
                    cursor="pointer"
                    onChange={handleImage}
                    type="file"
                    position="absolute"
                    height="100%"
                    opacity="0"
                    accept="image/*"
                />
            </Button>}
        </Flex>
    )
}

export default ProfileImage