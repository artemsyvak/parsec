import styles from './Cases.module.scss'
import { Container, Row, Col } from 'react-bootstrap'
import VideoPlayer from '../../components/VideoPlayer'
import Context from '../../services/Context'
import { useCustomContext } from '../../hooks'
import { CONTEXT_KEYS } from '../../enum'

// https://cdn.sanity.io/files/ir9d7bqu/production/1af63488e13a97070d6d965597de5e46bddaa9dd.mov
const Cases = () => {
    const [currentPage,] = useCustomContext(CONTEXT_KEYS.PAGE)

    return (
        <Context.Consumer>
            {() => (
                <Container className={styles.casesContainer}>
                    <div className={styles.video}>
                        {currentPage === 2 && (
                            <VideoPlayer source="./animation_reel.mov" />
                        )}
                    </div>
                    <Row className={styles.casesList}>
                        <Col xl={3} className={styles.caseItem}>
                            <h4>Lifecell</h4>
                            <p>Commercial video</p>
                        </Col>
                        <Col xl={3} className={styles.caseItem}>
                            <h4>Lifecell</h4>
                            <p>Commercial video</p>
                        </Col>
                        <Col xl={3} className={styles.caseItem}>
                            <h4>Lifecell</h4>
                            <p>Commercial video</p>
                        </Col>
                        <Col xl={3} className={styles.caseItem}>
                            <h4>Lifecell</h4>
                            <p>Commercial video</p>
                        </Col>
                    </Row>
                </Container>
            )}
        </Context.Consumer>

    )
}

export default Cases
