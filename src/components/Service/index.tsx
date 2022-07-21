import VideoPlayer from '../VideoPlayer/VideoPlayer'

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
    return (
        <div className={styles.service}>
            <h3>{title}</h3>
            <p>{description}</p>
            <span>[ 0{index} ]</span>            
            <div className={styles.video}>
                <VideoPlayer source={videoSource}/>                
            </div> 
        </div>
    )
}

export default Service
