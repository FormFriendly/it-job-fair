import {App} from '@/Types';
import Default from '@/Layouts/Default/Default';
import styles from "./indes.module.scss";

const IndexPage:App.Next.NextPage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                Тут будут вакансии
            </div>
        </div>
    )
}

IndexPage.Role = ['auth'];
IndexPage.getLayout = (children) => {
    return (
        <Default classes={{
            content: styles.layoutContent
        }}>
            {children}
        </Default>
    )
}

export default IndexPage