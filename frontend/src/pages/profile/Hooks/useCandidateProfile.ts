import {useQuery} from '@tanstack/react-query';
import * as Api from '@/Api';

export const useCandidateProfile = (enabled: boolean) => {
    return useQuery({
        queryKey: ['candidate-me'],
        queryFn: () => Api.Candidate.me(),
        enabled: enabled
    })
}