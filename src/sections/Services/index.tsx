import { useEffect, useState, memo } from 'react'
import SANITY_QUERY from '../../constants/queries'
import Sanity from '../../sanity'
import Service from '../../components/Service'
import { Container } from 'react-bootstrap'
import Context from '../../services/Context'

import styles from './Services.module.scss'

type ServiceItem = {
    title: string,
    description: string,
    videoSource: string
}

const Services = () => {

    const [services, setServices] = useState<ServiceItem[]>([])

    useEffect(() => {

        async function fetchServices() {
            try {
                const data = await Sanity.fetch(SANITY_QUERY.GET_SERVICES)
                setServices(data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchServices()

    }, [])

    return (
        <Context.Consumer>
            {() => (
                <div className={styles.services}>
                    <Container className="px-0">
                        {services && services.length > 0 && (
                            services.map((service: ServiceItem, index: number) => (
                                <Service key={service.title} {...service} index={index + 1} />
                            ))
                        )}
                    </Container>
                </div>
            )}
        </Context.Consumer>

    )
}

export default memo(Services)
