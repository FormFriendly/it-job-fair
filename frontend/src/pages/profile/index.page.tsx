import {App} from '@/Types';
import Default from '@/Layouts/Default/Default';
import {Flex} from "@chakra-ui/react";
import styles from "@/pages/login/index.module.scss";
import CompanyProfileForm from "@/pages/profile/Modules/CompanyProfile/CompanyProfileForm";
import CandidateProfileForm from "@/pages/profile/Modules/CandidateProfile/CandidateProfileForm";
import {useUserStore} from "@/Zustand/UserStore/User";
import {useUserRole} from "@/Hooks/User/useUserRole";

const IndexPage:App.Next.NextPage = () => {
    const roles = useUserRole();
    const candidate = useUserStore((state) => state.candidate);
    const company = useUserStore((state) => state.company);

    return (
        <Flex
            flexDir={"column"}
            my={"40px"}
            px={"120px"}
            py={"80px"}
            width={"90%"}
            height={"100%"}
            bgColor={"white"}
            borderRadius={"8px"}
            boxShadow={"0px 1px 2px 0px #0000000F, 0px 1px 3px 0px #0000001A"}
            overflow={"scroll"}
            _after={{
                content: `""`,
                display: "block",
                height: "80px",
                width: "100%"
            }}
        >
            {roles.candidate ? (
                candidate && <CandidateProfileForm user={candidate} />
            ) : (
                company && <CompanyProfileForm user={company} />
            )}
        </Flex>
    )
}

IndexPage.Role = ['auth'];
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