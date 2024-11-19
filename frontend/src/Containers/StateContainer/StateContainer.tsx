import {iStateController} from './types';
import ErrorView from './Components/Error/Error'
import EmptyView from './Components/Empty/Empty';
import LoadingView from './Components/Loading/Loading';

//Контейнер для отображения разных вьюшек исходя из состояния
const StateContainer = (props: iStateController) => {
    const {state} = props;

    if (state?.isError) return <ErrorView {...props} />;
    if (state?.isLoading) return <LoadingView {...props} />;
    if (state?.isEmpty) return <EmptyView {...props} />;
    //По умолчанию выводим сам компонент
    return <>{props.children}</>;
}

export default StateContainer;