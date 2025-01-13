import {useQuery} from '@tanstack/react-query';
import * as Api from '@/Api';

export const useSpecializations = () => {
    return useQuery({
        queryKey: ['specializations'],
        queryFn: () => Api.Common.getSpecializations(),
    })
}