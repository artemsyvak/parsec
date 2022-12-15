import Link from 'next/link'
import { CONTEXT_KEYS } from '../../enum'
import { useCustomContext } from '../../hooks'
import VideoPlayer from '../VideoPlayer'

import styles from './Service.module.scss'

type Props = {
    title: string
    description: string
    index: number
    videoSource?: string,
    serviceType: string
}

const Service = ({
    title,
    description,
    index,
    videoSource,
    serviceType,
}: Props) => {

    const [currentPage,] = useCustomContext(CONTEXT_KEYS.PAGE)

    return (
        <Link href={`/services/${serviceType}`}>
            <div className={styles.service}>
                <h3>{title}</h3>
                <p>{description}</p>
                <span>[ 0{index} ]</span>
                <div className={styles.video}>
                    {
                        currentPage === 1 && (
                            <VideoPlayer source={videoSource} />
                        )
                    }
                </div>
            </div>
        </Link>
    )
}

export default Service
