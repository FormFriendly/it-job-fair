import {Tag, TagProps} from '@chakra-ui/react'

type iTagItem = {
    label: string,
}

const TagItem = (props: iTagItem & TagProps) => {
    const {label, ...tagProps} = props

    return (
        <Tag
            colorScheme="purple"
            fontWeight={400}
            fontSize={"16px"}
            {...tagProps}
        >
            {label}
        </Tag>
    )
}

export default TagItem
