import { SECTION_NAMES } from '../enum'

type SectionTitle = {
    id: string,
    title: string,
    subtitle?: string,
    index: string
}

type SectionTitles = {
    [key: string]: SectionTitle
}

const SECTION_TITLES: SectionTitles = {
    [SECTION_NAMES.SERVICES]: {
        id: 'services-title', title: 'Services', index: '01', subtitle: 'Services'
    },
    [SECTION_NAMES.VIDEO_PRODUCTION_SERVICE]: {
        id: 'services-title', title: 'Video Production', index: '01'
    },
    [SECTION_NAMES.TWO_D_ANIMATION_SERVICE]: {
        id: 'services-title', title: '2D Animation', index: '01'
    },
    [SECTION_NAMES.THREE_D_ANIMATION_SERVICE]: {
        id: 'services-title', title: '3D Animation', index: '01'
    },
    [SECTION_NAMES.CASES]: {
        id: 'cases-title', title: 'Cases', index: '02', subtitle: 'Cases'
    },
    [SECTION_NAMES.CLIENTS]: {
        id: 'clients-title', title: 'Clients', index: '03', subtitle: 'Clients'
    },
    [SECTION_NAMES.FEEDBACKS]: {
        id: 'feedbacks-title', title: 'Reviews', index: '04', subtitle: 'Reviews'
    },
    // [SECTION_NAMES.TEAM]: {
    //     id: 'team-title', title: 'Team', index: '05', subtitle: 'Team'
    // },
    [SECTION_NAMES.CONTACT_US]: {
        id: 'contact-us-title', title: 'Contact Us', index: '05', subtitle: 'Collab'
    },

}

export { 
    SECTION_NAMES,
    SECTION_TITLES
}
