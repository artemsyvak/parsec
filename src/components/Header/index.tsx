import { Container, Row, Col } from 'react-bootstrap'
import NavigationLinks from './NavigationLinks';

import styles from './Header.module.scss';

type IProps = {
    inView: boolean
}

const Header = ({inView}:IProps) => {
    return (

        <Container className={`${styles.header}`}>
            <Row className="justify-content-space-between align-items-start h-100 gx-0">
                <Col xl={2} className="gx-0 d-flex align-items-start">
                    <img 
                    style={{
                        transform: inView ? "none" : "translateX(-50px)",
                        opacity: inView ? 1 : 0,
                        transition: "all .7s cubic-bezier(0.17, 0.55, 0.55, 1)"
                    }}
                    src="/logo-mini1.svg" className={styles.logo} alt="Parsec Studio Logo" />
                </Col>
                <Col xl={10} className="gx-0 d-flex justify-content-end">
                    <NavigationLinks inView={inView}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Header;
