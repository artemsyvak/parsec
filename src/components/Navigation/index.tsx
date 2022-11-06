import styles from './Navigation.module.scss'


const SECTIONS = [
    'Showreel',
    'Services',
    'Works',
    'Clients',
    'Feedbacks',
    'Contacts'
];

type PropsT = {
    setCurrentPage?: (index: number) => void;
    containerStyles?: any
 }

const Navigation = ({setCurrentPage}: PropsT) => {   

    return (
        <div className={styles.navigationContainer} >
            <ul>
                {SECTIONS.map((section: string, index: number) => (
                    <li onClick={() => setCurrentPage(index)} key={index}>{section}</li>
                ))}
            </ul>
        </div>
    )
}

export default Navigation