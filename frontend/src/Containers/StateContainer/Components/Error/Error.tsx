import {iStateController} from '../../types';
import {Alert} from 'antd';


const ErrorView = (props: iStateController) => {
    const settings = props.components?.error;
    if (settings?.render) return <>{settings.render}</>;
    return (
        <Alert type="error" message={settings?.message || 'Ошибка при загрузке данных'} />
    )
}

export default ErrorView;