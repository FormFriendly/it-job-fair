import CS from '@/Storages/Cookie';
import Routes from '@/Routes/Routes';

export const useLogout = () => {
    return () => {
        CS.token.clear();
        window.location.href = Routes.login // Делаем хард редирект он сбросит все стейты и query (тяжелое решение в тяжелые времена)
    }
}