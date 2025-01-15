export const Routes = {
    login: '/login',
    registration: '/registration',
    vacancies: '/vacancies',
    profile: {
        main: '/profile',
    },
    company: {
        vacancies: "/company/vacancies",
        applications: (id: string) => `/company/applications/${id}`,
    }
}


export default Routes;