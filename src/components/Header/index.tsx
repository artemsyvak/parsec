import { Container, Row, Col } from 'react-bootstrap'
import NavigationLinks from './NavigationLinks';

import styles from './Header.module.scss';
import useMobileDetect from '../../hooks';
import { useEffect, useState } from 'react';
import Logo from './Logo';

type IProps = {
    inView: boolean;
}

const Header = ({ inView }: IProps) => {

    const { isMobile } = useMobileDetect()

    const [renderMobile, setRenderMobile] = useState(false)
    const [logoFillColor, setLogoFillColor] = useState('white')

    useEffect(() => {
        const body = document.querySelector('body')
    
        const handleBurgerColor = () => {
          if ((body.scrollTop > body.clientHeight * 3 && body.scrollTop < body.clientHeight * 4) || (body.scrollTop > body.clientHeight * 5 && body.scrollTop < body.clientHeight * 6)) {
            setLogoFillColor('black')
          } else {
            setLogoFillColor('white')
          }
        }
    
        if (isMobile()) {
          setRenderMobile(true)
          body.addEventListener('scroll', handleBurgerColor)
        }
    
        return () => {
            body.removeEventListener('scroll', handleBurgerColor)
        }
    
      }, [])

    return (

        <Container className={`${styles.header} ${renderMobile ? 'position-sticky' : 'position-lg-absolute'}`}>
            <Row className="justify-content-space-between align-items-start h-100 gx-0">
                <Col xl={2} className="gx-0 d-flex align-items-start">
                    <span
                        style={{
                            transform: inView ? "none" : "translateX(-50px)",
                            opacity: inView ? 1 : 0,
                            transition: "all .7s cubic-bezier(0.17, 0.55, 0.55, 1)",
                        }}
                        className={styles.logo}
                    >
                        <Logo fillColor={logoFillColor}/>
                    </span>
                </Col>
                <Col xl={10} className="gx-0 d-none d-lg-flex justify-content-end">
                    <NavigationLinks inView={inView} />
                </Col>
            </Row>
        </Container>
    )
}

export default Header;
