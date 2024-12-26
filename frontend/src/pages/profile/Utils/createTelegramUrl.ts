const createTelegramUrl = (telegramNickname: string | null) => {
    if (!telegramNickname) return undefined;
    let url = "https://t.me/";
    if (telegramNickname.startsWith("@")) {
        url += telegramNickname.substring(1);
    } else {
        url += telegramNickname;
    }
    return url;
}

export default createTelegramUrl;