import {useQuery} from '@tanstack/react-query';
import * as Api from '@/Api';

export const useSkills = () => {
    return useQuery({
        queryKey: ['skills'],
        queryFn: () => Api.Common.getSkills(),
    })
}