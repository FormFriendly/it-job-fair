import {User} from "@/Types/User/User";


export type iState = {
    candidate: User.Candidate | null,
    company: User.Company | null
}

export type iActions = {
    addNewCandidate: (candidate: User.Candidate) => void,
    removeCandidate: () => void,
    addCompany: (company: User.Company) => void,
    removeCompany: () => void,
}