import {useQuery} from '@tanstack/react-query';
import * as Api from '@/Api';

export const useProfile = () => {
    return useQuery({
        queryKey: ['me'],
        queryFn: () => Api.User.profileMe(),
    })
}