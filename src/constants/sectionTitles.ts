import { SECTION_NAMES } from '../enum'

type SectionTitle = {
    id: string,
    title: string,
    subtitle: string,
    index: string
}

type SectionTitles = {
    [key: string]: SectionTitle
}

const SECTION_TITLES: SectionTitles = {
    [SECTION_NAMES.SERVICES]: {
        id: 'services-title', title: 'Services', index: '01', subtitle: 'послуги'
    },
    [SECTION_NAMES.CASES]: {
        id: 'cases-title', title: 'Cases', index: '02', subtitle: 'Роботи'
    },
    [SECTION_NAMES.CLIENTS]: {
        id: 'clients-title', title: 'Clients', index: '03', subtitle: 'Клієнти'
    },
    [SECTION_NAMES.FEEDBACKS]: {
        id: 'feedbacks-title', title: 'Reviews', index: '04', subtitle: 'Відгуки'
    },
    [SECTION_NAMES.TEAM]: {
        id: 'team-title', title: 'Team', index: '05', subtitle: 'Команда'
    },
    [SECTION_NAMES.CONTACT_US]: {
        id: 'contact-us-title', title: 'Contact Us', index: '06', subtitle: 'Співпраця'
    },
}

export { 
    SECTION_NAMES,
    SECTION_TITLES
}
