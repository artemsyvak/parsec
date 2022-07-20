import { memo } from 'react'
import Service from '../../components/Service'
import { Container } from 'react-bootstrap'
import Context from '../../services/Context'
import { useCustomContext } from '../../hooks'
import { CONTEXT_KEYS } from '../../enum'
import { getServiceSources } from '../../services/SanityDataProvider'

import styles from './Services.module.scss'

type ServiceItem = {
    title: string,
    description: string,
    videoSource: string
}

const Services = () => {
    const serviceSources = getServiceSources(useCustomContext(CONTEXT_KEYS.SANITY_DATA)[0].awsMedia)
    let services = useCustomContext(CONTEXT_KEYS.SANITY_DATA)[0].services
    services = services.map((service: ServiceItem) => {
        return {
            ...service,
            videoSource: serviceSources.find(source => source.title === service.title).fileURL
        }
    })

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
