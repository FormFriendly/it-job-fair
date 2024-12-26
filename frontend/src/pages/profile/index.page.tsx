import {useState} from "react";
import {App} from '@/Types';
import Default from '@/Layouts/Default/Default';
import {Flex} from "@chakra-ui/react";
import styles from "@/pages/login/index.module.scss";
import CompanyProfileForm from "@/pages/profile/Modules/CompanyProfile/CompanyProfileForm";
import CandidateProfileForm from "@/pages/profile/Modules/CandidateProfile/CandidateProfileForm";
import {useCompanyProfile} from "@/pages/profile/Hooks/useCompanyProfile";
import {useCandidateProfile} from "@/pages/profile/Hooks/useCandidateProfile";

const IndexPage:App.Next.NextPage = () => {
    // TODO: добавить смену стейта после добавления ролевой модели
    const [isCandidate, setIsCandidate] = useState<boolean>(false);

    const {data: candidateData, isPending: candidatePending} = useCandidateProfile({ enabled: isCandidate });
    const {data: companyData, isPending: companyPending} = useCompanyProfile({ enabled: !isCandidate });

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
            {isCandidate ? (
                candidateData && <CandidateProfileForm user={candidateData} />
            ) : (
                companyData && <CompanyProfileForm user={companyData} />
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