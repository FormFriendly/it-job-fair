import {useQuery} from '@tanstack/react-query';
import * as Api from '@/Api';

export const useApplications = (id: string) => {
    return useQuery({
        queryKey: ['vac-applications'],
        queryFn: () => Api.Vacancies.getVacancyApplications(id),
        refetchInterval: 5000,
        enabled: Boolean(id)
    })
}