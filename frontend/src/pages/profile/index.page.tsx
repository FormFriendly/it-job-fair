import {App} from '@/Types';
import Default from '@/Layouts/Default/Default';
import ProfileImage from "@/pages/profile/Modules/ProfileImage";
import {Flex} from "@chakra-ui/react";
import ProfileInfo from "@/pages/profile/Modules/ProfileInfo";

const IndexPage:App.Next.NextPage = () => {
    return (
        <Flex>
            <ProfileImage />
            <ProfileInfo />
        </Flex>
    )
}

//IndexPage.Role = ['user'];
IndexPage.getLayout = (children) => {
    return (
        <Default>
            {children}
        </Default>
    )
}

export default IndexPage