import styles from './NavigationLinks.module.scss';

interface LinkType{
    label: string,
    url: string
}

const Links: LinkType[] = [
    {
        url: '#first',
        label: 'Про Нас'
    },
    {
        url: '#second',
        label: 'Роботи'
    },
    {
        url: '#third',
        label: 'Послуги'
    },
    {
        url: '#sasat',
        label: 'Контакти'
    },
    {
        url: '#',
        label: 'Замовити Проект'
    }
]

const NavigationLinks = () => {
    return (
        <ul className={`${styles.navigationLinks} mb-0`}>
            {Links.map((link: LinkType) => (
                <li key={link.label}>
                    <a href={link.url}>{link.label}</a>   
                </li>
            ))}
        </ul>
    )
}

export default NavigationLinks;
