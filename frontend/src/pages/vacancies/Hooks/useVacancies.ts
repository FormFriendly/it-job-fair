import {useQuery} from '@tanstack/react-query';
import * as Api from '@/Api';

export const useVacancies = () => {
    return useQuery({
        queryKey: ['vacancies'],
        queryFn: () => Api.Vacancies.getVacancies(),
    })
}