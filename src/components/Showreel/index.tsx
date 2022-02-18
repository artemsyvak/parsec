import React from 'react';
import Header from '../Header';
import Button from '../Button';
import styles from './Showreel.module.scss';

const Showreel = () => {   

    const playShowreel = () => {
        return 'hello';
    }

    return (
        <div className={styles.showreel}>
            <Header />
            
            <span className={styles.shadow}></span>
            <img style={{ marginLeft: '32px' }} src="/showreel-logo.svg" className={styles.showreelLogo} alt="" />
            <Button
                style={{ margin: '20px 0 0 35px' }}
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
