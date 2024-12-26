const getResumeName = (url: string) => {
    return url.split("/").at(-1)
}

export default getResumeName
