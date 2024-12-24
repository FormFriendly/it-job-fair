import {useQuery} from '@tanstack/react-query';
import * as Api from '@/Api';

export const useCompanyProfile = (enabled: boolean) => {
    return useQuery({
        queryKey: ['company-me'],
        queryFn: () => Api.Company.me(),
        enabled: enabled,
    })
}