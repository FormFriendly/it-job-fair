import {useQuery} from '@tanstack/react-query';
import * as Api from '@/Api';
import {iEventVacanciesQuery} from "@/pages/vacancies/[id]/Types/types";

export const useEventVacancies = ({ id, enabled = false }: iEventVacanciesQuery) => {
    return useQuery({
        queryKey: ['event', id],
        queryFn: () => Api.Events.getEventVacancies(id),
        enabled: enabled,
        retry: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}