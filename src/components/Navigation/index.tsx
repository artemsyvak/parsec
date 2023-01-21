import styles from './Navigation.module.scss'


const SECTIONS = [
    'Showreel',
    'Services',
    'Works',
    'Clients',
    'Feedbacks',
    'Team',
    'Contacts'
];

const SECTION_NAVIGATION_COLOR = {
    Showreel: 'white',
    Services: 'white',
    Works: 'black',
    Clients: 'white',
    Feedbacks: 'black',
    Team: 'black',
    Contacts: 'white'
}

type PropsT = {
    currentPage?: number;
    setCurrentPage?: (index: number) => void;
    containerStyles?: any
}

const Navigation = ({ setCurrentPage, currentPage }: PropsT) => {

    return (

        <div className={styles.navigationContainer}
            style={{
                opacity: currentPage === 0 ? 0 : 1,
                top: `calc(50px + (100vh * ${currentPage}))`
            }}
        >
            <div className={styles.navigationBurger} >
                <div className={styles.navigationBurgerLine}></div>
                <div className={styles.navigationBurgerLine}></div>
                <ul>
                    {SECTIONS.map((section: string, index: number) => (
                        <li
                            style={{
                                // @ts-ignore
                                color: currentPage === index ? '#6F2BFF' : SECTION_NAVIGATION_COLOR[SECTIONS[currentPage]]
                            }}
                            onClick={() => setCurrentPage(index)} key={index}>
                            <span
                                style={{
                                    // @ts-ignore
                                    background: currentPage === index ? '#6F2BFF' : SECTION_NAVIGATION_COLOR[SECTIONS[currentPage]]
                                }}
                                className={styles.listStyledLine}></span>
                            {section}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}

export default Navigation
