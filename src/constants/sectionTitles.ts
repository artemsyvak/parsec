enum SECTION_NAMES {
    SERVICES = 'SERVICES',
    CASES = 'CASES'
}

// type SECTION_NAMES = 'SERVICES' | 'CASES'

type SectionTitle = {
    title: string,
    subtitle: string,
    index: string
}

type SectionTitles = {
    [key: string]: SectionTitle
}

const SECTION_TITLES: SectionTitles = {
    [SECTION_NAMES.SERVICES]: {
        title: 'Наші послуги', index: '01', subtitle: 'Services'
    },
    [SECTION_NAMES.CASES]: {
        title: 'Наші роботи', index: '02', subtitle: 'Cases'
    }
}

export { 
    SECTION_TITLES
}
