import styles from './SectionTitle.module.scss'

type Props = {
    id: string
    title: string
    subtitle: string
    index: string
}

const SectionTitle = ({
    title,
    subtitle,
    index
}: Props) => {
    return(
        <div className={styles.sectionTitleContainer}>

            <h2>
                {title}
                <span className={styles.topLine}></span>
                <span className={styles.index}>{index}</span>
                <span className={styles.bottomLine}></span>
                <span className={styles.topCircle}></span>
                <span className={styles.bottomCircle}></span> 
                <span className={styles.subtitle}>{subtitle}</span>               
            </h2>
        </div>
    )
}

export default SectionTitle
