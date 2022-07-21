import Image from 'next/image'
import { Container, Row, Col } from 'react-bootstrap'
import NavigationLinks from './NavigationLinks';

import styles from './Header.module.scss';

const Header = () => {
    return (

        <Container className={`${styles.header}`}>
            <Row className="justify-content-space-between align-items-start h-100 gx-0">
                <Col xl={2} className="gx-0">
                    <Image src="/logo.svg" alt="Parsec Studio Logo" width={159} height={17} />
                </Col>
                <Col xl={10} className="gx-0 d-flex justify-content-end">
                    <NavigationLinks />
                </Col>
            </Row>
        </Container>
    )
}

export default Header;
