import VacancyItem from "@/pages/vacancies/Modules/VacancyItem";
import {iVacancy} from "@/pages/vacancies/Types/types";

type iVacancyList = {
    vacancies: Array<iVacancy>;
}

const VacancyList = (props: iVacancyList) => {

    return (
        props.vacancies.map(vacancy => (
            <VacancyItem
                key={vacancy.id}
                vacancy={vacancy}
            />
        ))
    )
}

export default VacancyList
