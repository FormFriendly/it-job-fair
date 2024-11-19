
import {useQueryClient} from '@tanstack/react-query';
import {QueryCategory} from '@/Utils/Query/getQueryKey';
import CS from '@/Storages/Cookie';


export const useLogout = () => {
    const client = useQueryClient();
    return () => {
        CS.token.clear();
        client.resetQueries({queryKey: [QueryCategory.USER]});
    }

}