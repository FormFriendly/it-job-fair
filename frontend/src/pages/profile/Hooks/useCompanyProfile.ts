import {useQuery} from '@tanstack/react-query';
import * as Api from '@/Api';
import {iProfileQuery} from "@/pages/profile/Types/types";



export const useCompanyProfile = ({ enabled = true }: iProfileQuery) => {
    return useQuery({
        queryKey: ['company-me'],
        queryFn: () => Api.Company.me(),
        enabled: enabled,
    })
}