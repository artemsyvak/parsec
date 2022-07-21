import styles from './Fullpage.module.scss'

const Fullpage = (props: any) => {   
    return (
        <div className={styles.fullpageContainer}>
            {props.children}
        </div>
    )
}

export default Fullpage;
