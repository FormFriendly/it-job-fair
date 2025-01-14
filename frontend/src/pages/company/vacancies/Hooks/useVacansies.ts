import {useQuery} from '@tanstack/react-query';
import * as Api from '@/Api';

export const useVacancies = () => {
    return useQuery({
        queryKey: ['my-vacancies'],
        queryFn: () => Api.Vacancies.getVacancies({
            text: ''
        }),
        refetchInterval: 5000
    })
}