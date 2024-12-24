import VacancyItem from "@/pages/vacancies/Modules/VacancyItem";

const mockVacancies = [
    {
        title: "Software Engineer",
        description: "Job description...",
        salary: 70000,
        salary_type: "from",
        currency: "USD",
        location: "New York",
        work_mode: "remote",
        employment_type: "full-time",
        experience: "1-2 years",
        status: "active",
        id: 0,
        company_id: 0,
        event_id: 0,
        specialization_id: 0,
        created_at: "2024-12-24T09:37:06.935Z",
        updated_at: "2024-12-24T09:37:06.935Z",
        skills: [
            {
                skill: "Python",
                id: 0
            }
        ],
        specialization: {
            name: "Software Development",
            id: 0
        }
    }
]

const VacancyList = () => {
    return (
        mockVacancies.map(vacancy => (
            <VacancyItem
                key={vacancy.id}
                vacancy={vacancy}
            />
        ))
    )
}

export default VacancyList
