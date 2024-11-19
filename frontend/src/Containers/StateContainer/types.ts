import { ReactNode } from "react";


export type iStateController = {
    state?: {
        isLoading?: boolean;
        isError?: boolean;
        isEmpty?: boolean;
    }
    components?: {
        loading?: {
            //Сообщение в лоадере, игнорируется при рендер
            message?: ReactNode;
            render?: ReactNode;
            //Растянуть лоадер на весь флекс
            fullHeight?: boolean;
            center?: boolean;
            className?: string;
        }
        error?: {
            render?: ReactNode;
            message?: ReactNode;
        }
        empty?: {
            render?: ReactNode;
            message?: ReactNode;
        }
    }
    children: ReactNode;
}