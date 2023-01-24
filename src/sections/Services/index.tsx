import { memo } from 'react'
import Service from '../../components/Service'
import { Container } from 'react-bootstrap'
import Context from '../../services/Context'
import { useCustomContext } from '../../hooks'
import { CONTEXT_KEYS } from '../../enum'

import styles from './Services.module.scss'

type ServiceItem = {
    title: string,
    description: string,
    videoSource: string,
    videoId: string,
    serviceType: string,
}

type AWS_DATA_ITEM = {
    _id: string,
    title: string,
    fileURL: string,
}

type IProps = {
    inView?: boolean
}

const Services = ({inView}: IProps) => {
    const serviceSources =useCustomContext(CONTEXT_KEYS.SANITY_DATA)[0].awsMedia
    let services = useCustomContext(CONTEXT_KEYS.SANITY_DATA)[0].services
    services = services.map((service: ServiceItem) => {
        return {
            ...service,
            videoSource: serviceSources.find((source: AWS_DATA_ITEM) => source._id === service.videoId).fileURL
        }
    })

    return (
        <Context.Consumer>
            {() => (
                <div className={styles.services}>
                    <Container className="px-2 px-lg-0">
                        {services && services.length > 0 && (
                            services.map((service: ServiceItem, index: number) => (
                                <Service key={service.title} {...service} index={index + 1} inView={inView} />
                            ))
                        )}
                    </Container>
                </div>
            )}
        </Context.Consumer>

    )
}

export default memo(Services)
