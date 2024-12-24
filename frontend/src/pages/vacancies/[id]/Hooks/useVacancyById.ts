import {useQuery} from '@tanstack/react-query';
import * as Api from '@/Api';

export const useVacancyById = (id: number) => {
    return useQuery({
        queryKey: ['vacancy', id],
        queryFn: () => Api.Vacancies.getVacancyById(id),
    })
}