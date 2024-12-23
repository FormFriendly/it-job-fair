import {Flex, Text, Textarea, TextareaProps} from "@chakra-ui/react";
import {Controller, useFormContext} from "react-hook-form";

type iTextInput = {
    label?: string,
    registerName: string,
    registerOptions?: any;
    withError?: boolean;
    errorMessage?: string;
    margins?: string | string[],
}

const LongTextInput = (props: iTextInput & TextareaProps) => {
    const { control } = useFormContext();
    const {label, registerName, registerOptions, withError, errorMessage, ...inputProps} = props;

    return (
        <Flex flexDirection="column" m={props.margins} width={"100%"}>
            <Text mb={"4px"}>{label}</Text>
            <Controller
                control={control}
                name={registerName}
                rules={registerOptions}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Textarea
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        focusBorderColor={"purple.500"}
                        isInvalid={withError && Boolean(errorMessage)}
                        _hover={{
                            borderColor: "purple.500",
                        }}
                        _disabled={{
                            color: "gray.800",
                            borderColor: "gray.200"
                        }}
                        {...inputProps}
                    />
                )}
            />
            {withError && (
                <Text
                    minHeight={["15px", "18px"]}
                    fontSize={["10px", "10px", "12px"]}
                    visibility={Boolean(errorMessage) ? 'visible' : 'hidden'}
                    mt={["4px", "4px", "4px"]}
                    color={"red.500"}
                >
                    {errorMessage}
                </Text>
            )}
        </Flex>
    )
}

export default LongTextInput;