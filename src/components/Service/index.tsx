import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { CONTEXT_KEYS } from '../../enum'
import { useCustomContext } from '../../hooks'
import VideoPlayer from '../VideoPlayer'

import styles from './Service.module.scss'

type Props = {
    title: string
    description: string
    index: number
    videoSource?: string,
    serviceType: string,
    inView: boolean
}

const Service = ({
    title,
    description,
    index,
    videoSource,
    serviceType,
    inView
}: Props) => {

    const videoRef = useRef(null)

    const [currentPage,] = useCustomContext(CONTEXT_KEYS.PAGE)

    const onServiceMouseEnter = () => {
        videoRef.current.style.opacity = 1
    }

    const onServiceMouseLeave = () => {
        videoRef.current.style.opacity = 0
    }

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.style.opacity = index === 1 ? 1 : 0
        }
    }, [videoRef.current])

    return (
        <Link href={`/services/${serviceType}`}>
            <div
                style={{
                    transform: inView ? "none" : "translateY(-20px)",
                    opacity: inView ? 1 : 0,
                    transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) ${index}s`
                }}
                className={styles.service}
                onMouseEnter={onServiceMouseEnter}
                onMouseLeave={onServiceMouseLeave}
            >
                <h3
                    style={{
                        transform: inView ? "none" : "translateY(-20px)",
                        opacity: inView ? 1 : 0,
                        transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) ${index}.4s`
                    }}
                >{title}</h3>
                <p
                    style={{
                        transform: inView ? "none" : "translateY(20px)",
                        opacity: inView ? 1 : 0,
                        transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) ${index}.5s`
                    }}
                >{description}</p>
                <span
                    style={{
                        transform: inView ? "none" : "translateX(-20px)",
                        opacity: inView ? 1 : 0,
                        transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) ${index}.6s`
                    }}
                >[ 0{index} ]</span>
                <div className={styles.video} ref={videoRef}>
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
