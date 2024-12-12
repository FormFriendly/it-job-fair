const createFullName = (name: string, surname: string, patronymic: string | undefined) => {
    return `${surname} ${name} ${patronymic || ""}`;
}

export default createFullName;