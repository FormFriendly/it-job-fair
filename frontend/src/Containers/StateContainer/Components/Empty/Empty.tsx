import {iStateController} from '../../types';


const EmptyView = (props: iStateController) => {
    const settings = props.components?.empty;
    if (settings?.render) return <>{settings.render}</>;
    return "Данные отсутствуют"
}

export default EmptyView;