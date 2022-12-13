import { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faVolumeHigh, faVolumeLow, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'
import styles from './Controls.module.scss'


type Props = {
    isPlaying: boolean,
    isFullScreen: boolean,
    isMuted: boolean,
    volume: number,
    totalDuration: number,
    currentProgress: number,
    currentTime?: number,
    onPlayToggle: () => void,
    onProgressChange?: (e: any) => void,
    onFullScreen: () => void,
    onMuteToogle: () => void,
    onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const Controls = ({
    isPlaying,
    isFullScreen,
    isMuted,
    totalDuration,
    currentTime,
    currentProgress,
    volume,
    onPlayToggle,
    onProgressChange,
    onFullScreen,
    onMuteToogle,
    onVolumeChange,
}: Props) => {
    
    const volumeIcon = useMemo(() => {
        if (volume == 0) {
            return faVolumeXmark
        } else if (volume > .55) {
            return faVolumeHigh
        } else if (volume > 0) {
            return faVolumeLow
        }
    }, [volume])

    return (
        <div className={`${styles.videoPlayerControls} container`}>
            <div className={styles.buttons}>
                <button
                    className={styles.button}
                    onClick={onPlayToggle}
                >
                    <FontAwesomeIcon icon={!isPlaying ? faPlay : faPause} />
                </button>
                <div className={styles.videoProgress}>
                    <div
                        className={styles.currentProgress}
                        style={{ width: `${currentProgress}%` }}
                    /> 
                    <input
                        className={styles.videoProgressInput}
                        type="range"
                        min={0}
                        max={totalDuration}
                        // value={currentTime}
                        onChange={onProgressChange}
                    />
                </div>
                <div className={styles.volume}>
                    <FontAwesomeIcon size="sm" icon={volumeIcon}  onClick={onMuteToogle}/>
                    <div className={styles.progress} style={{ width: `${volume * 100}%` }}></div>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={onVolumeChange}
                    />
                </div>
            </div>

        </div>
    );
}

export default Controls;
