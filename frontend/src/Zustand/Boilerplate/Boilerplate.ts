import { create, iStore } from "@/Utils/Zustand/create";
import {iActions, iState} from './types';


//Стора для примера роутинга глобальных состояний
export const useBoilerplateStore = create<iStore<iState, iActions>>((set) => ({
    actions: {
        
    }
}))