import {Flex, Input, InputProps, Text} from "@chakra-ui/react";
import {Controller, useFormContext} from "react-hook-form";

type iTextInput = {
    label?: string,
    registerName: string,
    margins?: string | string[],
}

const TextInput = (props: iTextInput & InputProps) => {
    const { control } = useFormContext();
    const {label, registerName, ...inputProps} = props;

    return (
        <Flex flexDirection="column" m={props.margins} width={"100%"}>
            <Text mb={"4px"}>{label}</Text>
            <Controller
                control={control}
                name={registerName}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        focusBorderColor={"purple.500"}
                        _hover={{
                            borderColor: "purple.500",
                        }}
                        {...inputProps}
                    />
                )}
            />
        </Flex>
    )
}

export default TextInput;