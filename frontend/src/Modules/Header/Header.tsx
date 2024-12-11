import styles from './Header.module.scss'
import Logo from './Icons/Logo'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoBlock}>
                <Logo />
                <p>
                    IT BAZAR
                </p>
            </div>
        </header>
    )
}

export default Header