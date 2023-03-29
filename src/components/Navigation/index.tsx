import { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { SECTION_TITLES } from '../../constants/sectionTitles';
import useMobileDetect from '../../hooks';
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


const MOBILE_SECTIONS = new Map()

MOBILE_SECTIONS.set('Showreel', 'showreel')
MOBILE_SECTIONS.set('Services', 'services')
MOBILE_SECTIONS.set('Works', 'cases')
MOBILE_SECTIONS.set('Clients', 'clients')
MOBILE_SECTIONS.set('Feedbacks', 'feedbacks')
MOBILE_SECTIONS.set('Team', 'team')
MOBILE_SECTIONS.set('Contacts', 'contact-us')

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

    const { isMobile } = useMobileDetect()
    const [renderMobile, setRenderMobile] = useState(false)
    const [showMobileNavigation, setShowMobileNavigation] = useState(false)
    const [burgerColor, setBurgerColor] = useState('white')

    useEffect(() => {
        const body = document.querySelector('body')

        const handleBurgerColor = () => {
            if ((body.scrollTop > body.clientHeight * 2 && body.scrollTop < body.clientHeight * 3) || (body.scrollTop > body.clientHeight * 4 && body.scrollTop < body.clientHeight * 6)) {
                setBurgerColor('black')
            } else {
                setBurgerColor('white')
            }
        }

        if (isMobile()) {
            setRenderMobile(true)
            body.addEventListener('scroll', handleBurgerColor)
        }

        return () => {
            body.removeEventListener('scroll', handleBurgerColor)
        }

    }, [])

    return (
        <>
            {renderMobile && !showMobileNavigation ?
                <button
                    className={styles.mobileNavigationToggleBurgerButton}
                    onClick={() => setShowMobileNavigation(true)} >
                    <span style={{ backgroundColor: burgerColor }} />
                    <span style={{ backgroundColor: burgerColor }} />
                </button>
                : null}
            {renderMobile
                ? showMobileNavigation ?
                    <div className={styles.mobileNavigation}>
                        <button
                            className={styles.mobileNavigationCloseButton}
                            onClick={() => setShowMobileNavigation(false)}
                        />

                        <Nav className="flex-column align-items-center justify-content-center h-100">
                            {SECTIONS
                                .map((section: string, index: number) =>
                                    <Nav.Link key={section} href={`#${MOBILE_SECTIONS.get(section)}`}>
                                        {section}
                                    </Nav.Link>
                                )}
                        </Nav>

                    </div> : null
                :
                <div className={styles.navigationContainer}
                    style={{
                        opacity: currentPage === 0 ? 0 : 1,
                        top: `calc(50px + (100svh * ${currentPage}))`
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

                </div>}
        </>

    )
}

export default Navigation
