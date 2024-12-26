const getTelegramNickname = (telegramUrl: string | null) => {
    if (!telegramUrl) return null;
    const urlArray = telegramUrl.split('/')
    return "@" + urlArray[urlArray.length - 1];
}

export default getTelegramNickname;