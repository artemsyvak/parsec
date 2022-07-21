import styles from './VideoPlayer.module.scss'

type Props = {
    loop?: boolean,
    autoPlay?: boolean,
    muted?: boolean,
    source: string,
    type?: string
}

const VideoPlayer = ({
  loop = true,
  autoPlay = true,
  muted = true,
  source,
  type = 'video/mp4'
}: Props) => {
    return (
        <div className={styles.videoPlayer}>
            <video 
                    loop={loop}
                    autoPlay={autoPlay} 
                    style={{ width: '100%', height: '100%', position: 'absolute', objectFit: 'cover' }} muted={muted}>
                    <source src={source} type={type} />                               
                </video>
        </div> 
    )
}


export default VideoPlayer
