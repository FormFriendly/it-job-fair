import { iStore } from "@/Utils/Zustand/create";
import {iActions, iState} from './types';
import {createPrivateStore} from "@/Utils/Zustand/createPrivate";


export const {
    usePrivateStore: useUserStore,
    ContextComponent: UserStoreContext,
} = createPrivateStore<iStore<iState, iActions>>('UserStore', (set) => ({
    candidate: null,
    company: null,
    actions: {
        addNewCandidate: (newCandidate) => {
            set((state) => {
                return {
                    ...state,
                    candidate: newCandidate,
                }
            });
        },
        removeCandidate() {
            set((state) => {
                return {
                    ...state,
                    candidate: null,
                }
            })
        },
        addCompany(newCompany) {
            set((state) => {
                state.company = newCompany;
            })
        },
        removeCompany() {
            set((state) => {
                state.company = null;
            })
        },
    }
}));
