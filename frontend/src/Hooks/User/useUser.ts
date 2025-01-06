import {QueryKey, useQuery} from '@tanstack/react-query';
import * as Api from '@/Api';
import { getQueryKey } from '@/Utils/Query/getQueryKey';
import { iCandidateUser, iCompanyUser } from '@/pages/profile/Types/types';



export const queryKey = getQueryKey(['me'], (category) => category.USER);
export const useUser = () => {
    return useQuery({
        queryKey,
        queryFn: async () => {
            try {
                const responseDefaultMe = await Api.User.me()
                let responseRoleMe: iCompanyUser | iCandidateUser | null = null
                if (!responseDefaultMe) return null
                if (responseDefaultMe.role === 'candidate') {
                    responseRoleMe = await Api.Candidate.me()
                }
                if (responseDefaultMe.role === 'company') {
                    responseRoleMe = await Api.Company.me()
                }
                if (!responseRoleMe) return null
                return {
                    ...responseRoleMe,
                    ...responseDefaultMe
                }
            } catch (e) {
                console.error('Произошла ошибка при получении информации о пользователе')
            }
        },
        retry: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}