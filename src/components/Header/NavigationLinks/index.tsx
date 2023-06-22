import { CONTEXT_KEYS, SECTION_NUMBER } from '../../../enum';
import { useCustomContext } from '../../../hooks';
import styles from './NavigationLinks.module.scss';

interface LinkType {
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
    {
        sectionNumber: SECTION_NUMBER.FEEDBACKS,
        label: 'Feedbacks'
    },
    // {
    //     sectionNumber: SECTION_NUMBER.TEAM,
    //     label: 'Team'
    // },
    {
        sectionNumber: SECTION_NUMBER.CONTACT_US,
        label: 'Contacts'
    }
]

type IProps = {
    inView: boolean
}

const NavigationLinks = ({ inView }: IProps) => {

    const [, setCurrentPage] = useCustomContext(CONTEXT_KEYS.PAGE)

    return (
        <ul className={`${styles.navigationLinks} mb-0`}>
            {Links.map((link: LinkType, index: number) => (
                <li key={link.label}
                    style={{
                        transform: inView ? "none" : "translateY(-20px)",
                        opacity: inView ? 1 : 0,
                        transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) .${index + 1}s`
                    }}
                >
                    <button onClick={() => setCurrentPage(link.sectionNumber)}>{link.label}</button>
                </li>
            ))}
        </ul>
    )
}

export default NavigationLinks;
