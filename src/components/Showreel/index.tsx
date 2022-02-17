import Button from '../Button';
import styles from './Showreel.module.scss';

const Showreel = () => {


    const playShowreel = () => {

    }

    return (
        <div className={styles.showreel}>
            <span className={styles.shadow}></span>
            <img src="/showreel-logo.svg" className={styles.showreelLogo} alt="" />
            <Button
                style={{ marginTop: '20px' }}
                icon="/play-icon.svg"
                label='Watch showreel'
                onClick={playShowreel}
            />      

                <div className={`${styles.footer} container gx-0`}>                   
                    <p>
                        Ми допомагаємо брендам говорити з людьми,
                        а молодим артистам — доповнювати музичні
                        ідеї картинкою.
                    </p>
                    <div className={styles.skipButton}></div>
                    <ul className={styles.tags}>
                        <li><a href="#">Реклама</a></li>
                        <li><a href="#">Анімація</a></li>
                        <li><a href="#">Кліпи</a></li>
                    </ul>                   
                </div>            
        </div>
    )
}

export default Showreel
