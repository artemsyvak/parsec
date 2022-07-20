import { Container, Row, Col } from 'react-bootstrap'
import styles from './Clients.module.scss'
import { useCustomContext } from '../../hooks'
import { CONTEXT_KEYS } from '../../enum'
import { Client } from '../../types'


const Clients = () => {

    const clients: Client = useCustomContext(CONTEXT_KEYS.SANITY_DATA)[0].clients[0]

    return (
        <Container className={`${styles.clientsContainer} px-0 d-flex justify-content-center align-items-center`}>
            <Row className="h-100">
                {clients?.images.length > 0 &&
                    clients.images.map((image: string, index: number) => (
                        <Col
                            xl={3}
                            key={index}
                            className={`my-1 px-1`}>
                            <div className={styles.client}>
                                <img src={image} alt="client-image" />
                            </div>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}

export default Clients