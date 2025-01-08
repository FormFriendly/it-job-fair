import {useQuery} from '@tanstack/react-query';
import * as Api from '@/Api';

export const useEvents = () => {
    return useQuery({
        queryKey: ['events'],
        queryFn: () => Api.Events.getEvents(),
    })
}