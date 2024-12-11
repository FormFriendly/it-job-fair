import React from 'react';
import styles from './Default.module.scss';
// import Header from './../../Modules/Header/Header';
import classnames from 'classnames';
import Header from '@/Modules/Header/Header';

type iDefault = {
    showHeader?: boolean;
    children: React.ReactNode;
    classes?: {
        wrapper?: string;
        content?: string;
    }
}

// TODO Добавить пропсов в header типо full / small и тп + вынести его

const Default = (props: iDefault) => {
    return (
        <div className={classnames(styles.wrapper, props.classes?.wrapper)}>
            {props.showHeader && <Header />} 
            <div className={classnames(styles.content, props.classes?.content)}>
                {props.children}
            </div>
        </div>
    );
};

Default.defaultProps = {
    showHeader: true
}

export default Default;