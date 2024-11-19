import {iStateController} from '../../types';
import classnames from 'classnames';
import styles from './Loading.module.scss';
import DefaultLoader from '@/Components/Loader/Loader';

const LoadingView = (props: iStateController) => {
    const settings = props.components?.loading;
    const message = settings?.message || 'Загрузка данных...';
    return (
        <div className={classnames(styles.loader, settings?.className, {
            [styles.loaderFullHeight]: props.components?.loading?.fullHeight,
            [styles.loaderCenter]: props.components?.loading?.center
        })}>
            {
                settings?.render 
                    ? settings.render
                    : <DefaultLoader text={<>{message}</>} />
            }
        </div>
    )
}

export default LoadingView;