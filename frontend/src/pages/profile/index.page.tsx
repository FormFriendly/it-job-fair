import {App} from '@/Types';
import Default from '@/Layouts/Default/Default';
import ProfileImage from "@/pages/profile/Modules/ProfileImage";
import {Flex} from "@chakra-ui/react";
import ProfileInfo from "@/pages/profile/Modules/ProfileInfo";
import styles from "@/pages/login/index.module.scss";

const IndexPage:App.Next.NextPage = () => {
    return (
            <Flex
                px={"50px"}
                py={"80px"}
                width={"90%"}
                bgColor={"white"}
                borderRadius={"8px"}
                boxShadow={"0px 1px 2px 0px #0000000F, 0px 1px 3px 0px #0000001A"}
                alignItems={"center"}
                justifyContent={"space-around"}
            >
                <ProfileImage />
                <ProfileInfo />
            </Flex>
    )
}

//IndexPage.Role = ['user'];
IndexPage.getLayout = (children) => {
    return (
        <Default classes={{
            content: styles.layoutContent
        }}>
            {children}
        </Default>
    )
}

export default IndexPage