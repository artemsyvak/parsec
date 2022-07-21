import { useEffect, useRef, useState } from 'react'
import styles from './VideoPlayer.module.scss'
import { Transition } from 'react-transition-group'
import Controls from './Controls'


type Props = {
    loop?: boolean,
    controls?: boolean,
    source: string,
    type?: string
}

const transitionStylesVideo = {
    entering: {
        opacity: 0,
        transition: '.2s linear'
    },
    entered: {
        opacity: 1,
    },
    exiting: {
        opacity: 0,
        transition: '.5s linear'
    },
    exited: {
        opacity: 0,
    },
};

const transitionStylesVideoChangeBackground = {
    entering: {
        opacity: 0,
        transition: '.5s linear'
    },
    entered: {
        opacity: 0,
        transition: '.5s linear',
    },
    exiting: {
        opacity: 1,
    },
    exited: {
        opacity: 1,
    },
};

const VideoPlayer = ({
    loop = true,
    controls = false,
    source,
    type = 'video/mp4'
}: Props) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(true)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [currentProgress, setCurrentProgress] = useState<number>(0)
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
    const [isMuted, setIsMuted] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [volumeBar, setVolumeBar] = useState<number>(0)
    const [totalDuration, setTotalDuration] = useState<number>(0)
    const [volume, setVolume] = useState<number>(0)

    const player = useRef<any>(null)
    const [isSourceChanged, setIsSourceChanged] = useState<boolean>(true)

    const onVolumeChange = (e: any) => {
        const volume = e.target.value
        setVolume(e.target.value)
        // @ts-ignore
        // player.current.volume = volume
    }

    const onProgressChange = (e: any) => {
        const progress = e.target.value
        setCurrentTime(progress)
        setCurrentProgress((progress / player.current.duration) * 100)
        // @ts-ignore
        player.current.currentTime = progress
    }

    const onPlayToggle = () => {
        setIsPlaying(!isPlaying)
        if(!isPlaying){
            player.current.play()
        }else{
            player.current.pause()
        }
    }

    useEffect(() => {
        let playerTimeout: any = null
        // clearTimeout(playerTimeout)

        playerTimeout = setTimeout(() => {
            setIsSourceChanged(false)
            player?.current.pause()
            player?.current.load()           
            player?.current.play()
            console.log(player?.current.duration)
        }, 0)
      
        let durationTimeout: any = null
        // clearTimeout(durationTimeout)

        durationTimeout = setTimeout(() => {
            setTotalDuration(player?.current?.duration)
            if(player?.current){
                player.current.volume = volume
            }
            setIsSourceChanged(true)
        }, 600)

        return () => {
            clearTimeout(playerTimeout)
            clearTimeout(durationTimeout)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [source])

    useEffect(() => {
        let playerUpdateInterval: any = null;
        if (controls && isPlaying) {
            playerUpdateInterval = setInterval(() => {
                setCurrentTime(player.current?.currentTime);               
                setCurrentProgress((player.current?.currentTime / player?.current.duration) * 100);                
            }, 0);
        }
        return () => {
            clearInterval(playerUpdateInterval);
        }
    }, [isPlaying, controls])

    return (
        <Transition in={isSourceChanged} timeout={0}>
            {(state) => {
                return (
                    <div className={styles.videoPlayer}>
                        <div
                            className={styles.changeBackgroundContainer}
                            // @ts-ignore
                            style={{ ...transitionStylesVideoChangeBackground[state] }}
                        />
                        <video
                            ref={player}
                            loop={loop}
                            autoPlay={isPlaying}
                            style=
                            {{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                objectFit: 'cover',
                                // @ts-ignore
                                ...transitionStylesVideo[state]
                            }}
                            muted={volume === 0}
                        >
                            <source src={source} type={type} />
                        </video>
                        {controls && (
                            <Controls
                                isMuted={isMuted || volume === 0}
                                isPlaying={isPlaying}
                                isFullScreen={isFullScreen}
                                currentTime={currentTime}
                                currentProgress={currentProgress}
                                totalDuration={totalDuration}
                                onPlayToggle={onPlayToggle}
                                onFullScreen={() => setIsFullScreen(!isFullScreen)}
                                onMute={() => setIsMuted(!isMuted)}
                                onProgressChange={onProgressChange}
                                onVolumeChange={onVolumeChange}
                                volume={volume}
                            />
                        )}

                    </div>
                )
            }}
        </Transition>
    )
}

export default VideoPlayer
