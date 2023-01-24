import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { CONTEXT_KEYS } from '../../enum'
import useMobileDetect, { useCustomContext } from '../../hooks'
import styles from './SectionTitle.module.scss'

type Props = {
    id: string
    title: string
    subtitle?: string
    index: string
    inView: boolean,
    backgroundColor: 'white' | 'black'
}

const SectionTitle = ({
    title,
    subtitle,
    index,
    inView,
    backgroundColor
}: Props) => {

    const [currentPage,] = useCustomContext(CONTEXT_KEYS.PAGE)

    const { isMobile } = useMobileDetect()

    const [renderMobile, setRenderMobile] = useState(false)

    useEffect(() => {
        if (isMobile()) {
            setRenderMobile(true)
        }
    }, [])

    return (
        <motion.div
            key={title}
            className={styles.sectionTitleContainer}
            style={{
                background: renderMobile && backgroundColor === 'white'
                    ? 'linear-gradient(180deg,rgba(199,172,254,1) 30%, rgba(255,255,255,1) 100%)'
                    : backgroundColor,
            }}
        >
            <h2>
                <span className={styles.title}
                    style={{
                        transform: inView ? "none" : "translateY(-200px)",
                        opacity: inView ? 1 : 0,
                        transition: "all .7s cubic-bezier(0.17, 0.55, 0.55, 1)",
                    }}
                >{title}</span>

                <span className={styles.topLine}
                    style={{
                        width: inView ? '200px' : 0,
                        transform: inView ? "none" : "translateX(-200px)",
                        opacity: inView ? 1 : 0,
                        transition: "all .8s cubic-bezier(0.17, 0.55, 0.55, 1) .1s"
                    }}
                ></span>
                <span className={styles.index}
                    style={{
                        transform: inView ? "none" : "translateX(200px)",
                        opacity: inView ? 1 : 0,
                        transition: "all .8s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s"
                    }}
                >{index}</span>
                <span className={styles.bottomLine}
                    style={{
                        transform: inView ? `translateY(${(currentPage * 24) - 8}px)` : "translateY(-50px) rotate(360deg)",
                        opacity: inView ? 1 : 0,
                        transition: "all .7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
                    }}
                ></span>
                <span className={styles.topCircle}
                    style={{
                        transform: inView ? "none" : "translateX(50px) rotate(180deg)",
                        opacity: inView ? 1 : 0,
                        transition: "all .8s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                    }}
                ></span>
                <span className={styles.bottomCircle}
                    style={{
                        transform: inView ? "none" : "translateX(-50px) rotate(-180deg)",
                        opacity: inView ? 1 : 0,
                        transition: "all .8s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                    }}
                ></span>
                {subtitle && (
                    <span className={styles.subtitle}
                        style={{
                            transform: inView ? "translateY(-35%)" : "translateY(35%)",
                            opacity: inView ? 1 : 0,
                            transition: "all .7s cubic-bezier(0.17, 0.55, 0.55, 1)"
                        }}
                    >{subtitle}</span>
                )}
            </h2>
        </motion.div>
    )
}

export default SectionTitle
