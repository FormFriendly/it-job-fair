import {ReactNode} from "react";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";

type iModalWrapper = {
    header?: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const ModalWrapper = (props: iModalWrapper) => {

    return (
        <Modal
            onClose={props.onClose}
            isOpen={props.isOpen}
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                {props.header && (
                    <ModalHeader alignSelf={"center"}>
                        {props.header}
                    </ModalHeader>
                )}
                <ModalCloseButton top={"16px"} />
                <ModalBody pb={"40px"} px={"28px"} pt={"16px"}>
                    {props.children}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalWrapper;