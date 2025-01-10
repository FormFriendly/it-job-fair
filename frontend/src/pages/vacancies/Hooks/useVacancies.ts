import {useQuery} from '@tanstack/react-query';
import * as Api from '@/Api';
import {iQueryParams} from "@/pages/vacancies/Types/types";

export const useVacancies = ({ enabled, ...params }: iQueryParams) => {
    return useQuery({
        queryKey: ['vacancies', params],
        queryFn: () => Api.Vacancies.getVacancies(params),
        enabled: enabled,
    })
}