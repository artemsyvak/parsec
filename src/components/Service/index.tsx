import { CONTEXT_KEYS } from '../../enum'
import { useCustomContext } from '../../hooks'
import VideoPlayer from '../VideoPlayer'

import styles from './Service.module.scss'

type Props = {
    title: string
    description: string
    index: number
    videoSource?: string
}

const Service = ({
    title,    
    description,
    index,
    videoSource
}: Props) => {

    const [currentPage,] = useCustomContext(CONTEXT_KEYS.PAGE)
    
    return (
        <div className={styles.service}>
            <h3>{title}</h3>
            <p>{description}</p>
            <span>[ 0{index} ]</span>            
            <div className={styles.video}>
                {
                    currentPage === 1 && (
                        <VideoPlayer source={videoSource}/>                
                    )
                }
            </div> 
        </div>
    )
}

export default Service
