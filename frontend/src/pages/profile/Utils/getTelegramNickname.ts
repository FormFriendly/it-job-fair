const getTelegramNickname = (telegramUrl: string) => {
    const urlArray = telegramUrl.split('/')
    return "@" + urlArray[urlArray.length - 1];
}

export default getTelegramNickname;