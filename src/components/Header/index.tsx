import Image from 'next/image'

import NavigationLinks from './NavigationLinks';

import styles from './Header.module.scss';

const Header = () => {
    return (
        <div className={styles.header}>
            <Image src="/logo.svg" alt="Parsec Studio Logo" width={159} height={17} />
            <NavigationLinks/>                   
        </div>

    )
}

export default Header;
