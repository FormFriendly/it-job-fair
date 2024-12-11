import cookies from 'js-cookie';

const results = {
    token: (() => {
        const ACCESS_TOKEN = 'access_token'
        return {
            getAccess: () => {
                const token = cookies.get(ACCESS_TOKEN);
                if (!token) return null;
                return {
                    token,
                }
            },
            setAccess: (token: string) => {
                const daysToExpire = 7;
                cookies.set(ACCESS_TOKEN, token, { expires: daysToExpire });
            },
            clear: () => {
                cookies.remove(ACCESS_TOKEN);
            }
        }
    })()
}

export default results;