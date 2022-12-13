import { useEffect, useRef, useState } from 'react'
import styles from './VideoPlayer.module.scss'
import { Transition } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Controls from './Controls'
import Spinner from '../Spinner'


type Props = {
    loop?: boolean,
    controls?: boolean,
    source: string,
    type?: string,
    onCloseFullProject?: () => void,
    onDetailedInfoOpen?: () => void,
    isProjectDetailsOpen?: boolean,
    isFullProjectOpen?: boolean,
    isShowreelPlayer?: boolean
}

const transitionStylesVideo = {
    entering: {
        opacity: 0,
        transition: '.1s linear'
    },
    entered: {
        opacity: 1,
    },
    exiting: {
        opacity: 0,
        transition: '.3s linear'
    },
    exited: {
        opacity: 0,
    },
};

const transitionStylesVideoChangeBackground = {
    entering: {
        opacity: 0,
        transition: '.2s linear'
    },
    entered: {
        opacity: 0,
        transition: '.2s linear',
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
    type = 'video/mp4',
    onCloseFullProject,
    onDetailedInfoOpen,
    isFullProjectOpen,
    isShowreelPlayer = false,
    isProjectDetailsOpen = undefined
}: Props) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(true)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [currentProgress, setCurrentProgress] = useState<number>(0)
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false)
    const [totalDuration, setTotalDuration] = useState<number>(0)
    const [volume, setVolume] = useState<number>(0)
    const [isControlsHidden, setIsControlsHidden] = useState(false)

    const player = useRef<HTMLVideoElement>(null)
    const [isSourceChanged, setIsSourceChanged] = useState<boolean>(true)

    const onVolumeChange = (e: any) => {
        const volume = e.target.value
        setVolume(e.target.value)
        // @ts-ignore
        player.current.volume = volume
    }

    const onProgressChange = async (e: any) => {       
        const progress = parseFloat(e.target.value)
        player.current.pause()
        setCurrentTime(progress)
        setCurrentProgress((progress / player.current.duration) * 100)
        // @ts-ignore
        player.current.currentTime = progress
        await player.current.play()
    }

    const onPlayToggle = async () => {
        setIsPlaying(!isPlaying)
        if (!isPlaying) {
            await player.current.play()
        } else {
            player.current.pause()
        }
    }

    const onMuteToogle = () => {
        if (volume > 0) {
            setVolume(0)
        } else {
            setVolume(.5)
        }
    }

    useEffect(() => {        

        if(isProjectDetailsOpen) return

        let playerTimeout: any = null
        clearTimeout(playerTimeout)            

        playerTimeout = setTimeout(() => {
            player?.current.pause()
            player?.current.load() 
            setIsSourceChanged(false)                      
        }, 0)

        let durationTimeout: any = null
        clearTimeout(durationTimeout)

        durationTimeout = setTimeout(async() => {                        
                       
            if(player?.current?.duration !== NaN){
                setTotalDuration(player?.current?.duration)
                setIsSourceChanged(true) 
                await player?.current.play()                          
                setIsPlaying(true)
            }
        }, 1000)

        return () => {
            clearTimeout(playerTimeout)
            clearTimeout(durationTimeout)
        }
    }, [source, isProjectDetailsOpen])

    useEffect(() => {
        let playerUpdateInterval: any = null;
        if (controls && isPlaying) {
            playerUpdateInterval = setInterval(() => {
                setCurrentTime(player.current?.currentTime);
                setCurrentProgress((player.current?.currentTime / player?.current.duration) * 100);
            }, 100);
        }

        return () => {
            clearInterval(playerUpdateInterval);
        }
    }, [isPlaying, controls])

    useEffect(() => {
        if (controls) {
            let volumeTimeout = null
            clearTimeout(volumeTimeout)

            volumeTimeout = setTimeout(() => {
                setVolume(.5)
            }, 0)
        } else {
            setVolume(0)
        }
    }, [controls])


    useEffect(() => {
        player.current.volume = volume
    }, [volume])

    useEffect(() => {        
        let closeControlsTimeout: any = null
        if (isFullProjectOpen && !isControlsHidden) {
            clearTimeout(closeControlsTimeout)
            closeControlsTimeout = setTimeout(() => {
                setIsControlsHidden(true)
            }, 2000)
        }
        return () => {
            clearTimeout(closeControlsTimeout)
        }
    }, [isFullProjectOpen, isControlsHidden])

    useEffect(() => {
        if(isFullProjectOpen){
            onProgressChange({target: {value: '0'}})
        }
    }, [isFullProjectOpen])

    useEffect(() => {
        if(isProjectDetailsOpen !== undefined && isProjectDetailsOpen && isPlaying){
            onPlayToggle()
        }
    }, [isProjectDetailsOpen, isPlaying])


    const onDetailedInfoOpenHandler = () => {
        onPlayToggle()
        onDetailedInfoOpen?.()
    }

    const onCloseFullProjectHandler = () => {
        setIsPlaying(true)
        onCloseFullProject?.()
    }

    return (
        <Transition in={isSourceChanged} timeout={0}>
            {(state) => {
                return (
                    <div
                        className={
                            `${styles.videoPlayer} 
                            ${controls && !isControlsHidden
                                ? `${styles.controls}`
                                : ''}`}
                        onMouseMove={() => setIsControlsHidden(false)}
                    >
                        <div
                            className={styles.changeBackgroundContainer}
                            // @ts-ignore
                            style={{ ...transitionStylesVideoChangeBackground[state] }}>
                                <Spinner />
                            </div>                        

                        {controls && (
                            <Transition in={isControlsHidden} timeout={0}>
                                {(controlsState) => {
                                    return (
                                        <>
                                            <button className={styles.backButton} onClick={onCloseFullProjectHandler}
                                                // @ts-ignore
                                                style={{ ...transitionStylesVideoChangeBackground[controlsState] }}
                                            >

                                                {!isShowreelPlayer && ('back to projects')}
                                                <FontAwesomeIcon icon={faXmark} size="lg" />
                                            </button>

                                            {
                                                !isShowreelPlayer && (
                                                    <button className={styles.openDetailsButton} onClick={onDetailedInfoOpenHandler}
                                                        // @ts-ignore
                                                        style={{ ...transitionStylesVideoChangeBackground[controlsState] }}
                                                    >
                                                        more about project
                                                        <span className={styles.arrows}></span>
                                                    </button>
                                                )
                                            }
                                        </>
                                    )
                                }}
                            </Transition>

                        )}

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
                            <Transition in={isControlsHidden} timeout={0}>
                                {(controlsState) => {
                                    return (
                                        <div
                                            // @ts-ignore
                                            style={{ ...transitionStylesVideoChangeBackground[controlsState] }}
                                        >
                                            <Controls
                                                isMuted={volume === 0}
                                                isPlaying={isPlaying}
                                                isFullScreen={isFullScreen}
                                                currentTime={currentTime}
                                                currentProgress={currentProgress}
                                                totalDuration={totalDuration}
                                                onPlayToggle={onPlayToggle}
                                                onFullScreen={() => setIsFullScreen(!isFullScreen)}
                                                onMuteToogle={onMuteToogle}
                                                onProgressChange={onProgressChange}
                                                onVolumeChange={onVolumeChange}
                                                volume={volume}
                                            />
                                        </div>

                                    )
                                }}
                            </Transition>
                        )}                        
                    </div>
                )
            }}
        </Transition>
    )
}

export default VideoPlayer