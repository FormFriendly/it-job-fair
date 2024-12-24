import {iStateController} from '../../types';


const ErrorView = (props: iStateController) => {
    const settings = props.components?.error;
    if (settings?.render) return <>{settings.render}</>;
    return (
        'Ошибка при загрузке данных'
    )
}

export default ErrorView;