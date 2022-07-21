import { useEffect, useState, memo } from 'react'
import SANITY_QUERY from '../../constants/queries'
import Sanity from '../../sanity'

type ServiceItem = {
    title: string,
    description: string
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
        <>
            {services && services.length > 0 && (
                services.map(({ title, description }: ServiceItem) => (
                    <div key={title}>
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </div>
                ))
            )}
        </>
    )
}

export default memo(Services)
