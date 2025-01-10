import React from "react";
import {Button, Flex, Heading, Input, InputGroup, InputRightAddon} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {iQueryParams, iSearchInput} from "@/pages/vacancies/Types/types";

type iSearchHeader = {
    setSearchParams: (searchParams: iQueryParams) => void;
    isLoading: boolean
}

const SearchHeader = (props: iSearchHeader) => {
    const { control, handleSubmit } = useForm<iSearchInput>({
        defaultValues: {
            text: ""
        }
    })

    const findText: SubmitHandler<iSearchInput> = (values) => {
        props.setSearchParams({ enabled: true, ...values});
    }

    return (
        <Flex
            flexDirection="column"
            bgColor={"white"}
            borderRadius={"8px"}
            boxShadow={"0px 1px 2px 0px #0000000F, 0px 1px 3px 0px #0000001A"}
            p={"50px"}
        >
            <Heading mb={"20px"}>
                Найди работу мечты в IT
            </Heading>
            <form onSubmit={handleSubmit(findText)}>
                <Flex>
                    <Controller
                        control={control}
                        name={"text"}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <InputGroup>
                                <Input
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    focusBorderColor={"purple.500"}
                                    borderColor={"purple.100"}
                                    _hover={{
                                        borderColor: "purple.500",
                                    }}
                                />
                                <InputRightAddon
                                    p={0}
                                    borderWidth={0}
                                >

                                    <Button
                                        type={"submit"}
                                        width={"100%"}
                                        bgColor={"purple.100"}
                                        borderRadius={"0 6px 6px 0"}
                                        _hover={{
                                            backgroundColor: "purple.200",
                                        }}
                                        fontWeight={500}
                                        leftIcon={<SearchIcon />}
                                        isLoading={props.isLoading}
                                    >
                                        Найти
                                    </Button>
                                </InputRightAddon>
                            </InputGroup>
                        )}
                    />
                </Flex>

            </form>
        </Flex>
    )
}

export default SearchHeader