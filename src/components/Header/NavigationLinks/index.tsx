import { CONTEXT_KEYS, SECTION_NUMBER } from '../../../enum';
import { useCustomContext } from '../../../hooks';
import styles from './NavigationLinks.module.scss';

interface LinkType{
    sectionNumber: number,
    label: string
}

const Links: LinkType[] = [
    {
        sectionNumber: SECTION_NUMBER.SERVICES,
        label: 'Services'
    },
    {
        sectionNumber: SECTION_NUMBER.CASES,
        label: 'Works'
    },
    {
        sectionNumber: SECTION_NUMBER.CLIENTS,
        label: 'Clients'
    },
    // {
    //     sectionNumber: SECTION_NUMBER.FEEDBACKS,
    //     label: 'Feedbacks'
    // },
    // {
    //     sectionNumber: SECTION_NUMBER.TEAM,
    //     label: 'Team'
    // },
    {
        sectionNumber: SECTION_NUMBER.CONTACT_US,
        label: 'Contacts'
    }
]

const NavigationLinks = () => {

    const [,setCurrentPage] = useCustomContext(CONTEXT_KEYS.PAGE)

    return (
        <ul className={`${styles.navigationLinks} mb-0`}>
            {Links.map((link: LinkType) => (
                <li key={link.label}>
                    <button onClick={() => setCurrentPage(link.sectionNumber)}>{link.label}</button>   
                </li>
            ))}
        </ul>
    )
}

export default NavigationLinks;
