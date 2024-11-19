import {iStateController} from '../../types';
import {Empty} from 'antd';


const EmptyView = (props: iStateController) => {
    const settings = props.components?.empty;
    if (settings?.render) return <>{settings.render}</>;
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={settings?.message || "Данные отсутствуют"} />
}

export default EmptyView;