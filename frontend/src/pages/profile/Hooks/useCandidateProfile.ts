import {useQuery} from '@tanstack/react-query';
import * as Api from '@/Api';
import {iProfileQuery} from "@/pages/profile/Types/types";

export const useCandidateProfile = ({ enabled = true }: iProfileQuery) => {
    return useQuery({
        queryKey: ['candidate-me'],
        queryFn: () => Api.Candidate.me(),
        enabled: enabled
    })
}