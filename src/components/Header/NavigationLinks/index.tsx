import styles from './NavigationLinks.module.scss';

const NavigationLinks = () => {
    return (
        <ul className={styles.navigationLinks}>
            <li><a href="#">Про нас </a></li>           
            <li><a href="#">Роботи</a></li>
            <li><a href="#">Послуги</a></li>
            <li><a href="#">Контакти</a></li>
            <li><a href="#">Замовити проект</a></li>
        </ul>
    )
}

export default NavigationLinks;
