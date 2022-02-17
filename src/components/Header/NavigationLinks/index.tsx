import styles from './NavigationLinks.module.scss';

interface LinkType{
    label: string,
    url: string
}

const Links: LinkType[] = [
    {
        url: '#',
        label: 'Про Нас'
    },
    {
        url: '#',
        label: 'Роботи'
    },
    {
        url: '#',
        label: 'Послуги'
    },
    {
        url: '#',
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
