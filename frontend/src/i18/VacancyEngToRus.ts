const getRusSalaryType = (type: string) => {
    if (type === 'from') return 'от'
    return "до"
}

const getRusStatus = (status: string) => {
    if (status === 'active') return 'Активная'
    if (status === 'closed') return 'Закрытая'
    return 'В архиве'
}

const getRusWorkPlace = (workPlace: string) => {
    if (workPlace === "remote") return "Удаленно";
    if (workPlace === "office") return "В офисе";
    if (workPlace === "hybrid") return "Гибрид";
}

const getRusYears = (years: string) => {
    if (years === "no experience") return "Без опыта";
    if (years === "less than year") return "Меньше года";
    if (years === "1-2 years") return "1-2 года";
    if (years === "3-4 years") return "3-4 года";
    if (years === "5+ years") return "5+ лет";
}

export const VacancyEngToRus = {
    getRusSalaryType,
    getRusStatus,
    getRusWorkPlace,
    getRusYears
}