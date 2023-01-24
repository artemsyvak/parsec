import { Container } from 'react-bootstrap'
import styles from './Service.module.scss'


type Props = {
    description: string[]
}
const ServiceDescription = ({ description }: Props) => {
    return (
        <Container id="service-description" className={`${styles.descriptionText} px-2 px-lg-0`}>
            {description.map((text: string, index: number) => (
                <p key={index}>{text}</p>
            ))}
        </Container>
    )
}

export default ServiceDescription
