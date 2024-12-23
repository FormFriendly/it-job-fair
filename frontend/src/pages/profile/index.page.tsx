import {App} from '@/Types';
import Default from '@/Layouts/Default/Default';
import {Flex} from "@chakra-ui/react";
import styles from "@/pages/login/index.module.scss";
import ProfileForm from "@/pages/profile/Modules/ProfileForm";
import CompanyProfileForm from "@/pages/profile/Modules/CompanyProfile/CompanyProfileForm";

const mockUser = {
    name: "John",
    surname: "Doe",
    patronymic: "Doevich",
    date_of_birth: "1990-01-01",
    contact_phone: "+123456789",
    contact_email: "new_email@example.com",
    avatar_path: "/avatars/johndoe.png",
    tg_link: "https://t.me/johndoe",
    id: 0,
    user_id: 0,
    created_at: "2024-12-12T13:40:42.083Z",
    updated_at: "2024-12-12T13:40:42.083Z"
}

const mockCompany = {
    name: "TechCorp",
    description: "Leading tech company...",
    website: "https://techcorp.com",
    location: "San Francisco",
    contact_phone: "+123456789",
    contact_email: "techcorp@example.com",
    tg_link: "https://t.me/techcorp",
    logo_path: "/logos/techcorp.png",
    id: 0,
    user_id: 0,
    created_at: "2024-12-23T12:43:27.842Z",
    updated_at: "2024-12-23T12:43:27.843Z"
}

const IndexPage:App.Next.NextPage = () => {
    return (
            <Flex
                mt={"40px"}
                px={"120px"}
                py={"80px"}
                width={"90%"}
                bgColor={"white"}
                borderRadius={"8px"}
                boxShadow={"0px 1px 2px 0px #0000000F, 0px 1px 3px 0px #0000001A"}
                overflowY={"auto"}
            >
                {/*<ProfileForm user={mockUser} />*/}
                <CompanyProfileForm user={mockCompany} />
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