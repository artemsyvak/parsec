import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Slider from "react-slick";
import Context from '../../services/Context';
import { useCustomContext } from '../../hooks';
import { CONTEXT_KEYS } from '../../enum';
import { SHOWREEL_SLIDES } from '../../constants';
import ShowreelDNA from './ShowreelDNA';
import { DNA_LIST } from '../../constants';
import { Transition } from 'react-transition-group';
import VideoPlayer from '../../components/VideoPlayer';

import styles from './Showreel.module.scss';
import { getShowreelSource } from '../../services/SanityDataProvider';

const sliderSettings = {
    dots: false,
    arrows: false,
    centerMode: true,
    adaptiveHeight: true,
    centerPadding: "25%",
    autoplay: false,
    draggable: false,
    swipe: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
}

const transitionShowreelControlsStyles = {
    entering: {

    },
    entered: {

    },
    exiting: {

    },
    exited: {
        opacity: 0,
        transform: 'translateY(-500px)',
        position: 'absolute',
    },
};


const transitionSliderContainerStyles = {
    entering: {
        opacity: 0,
        transform: 'translateX(70vw)',
        transition: '.5s ease'
    },
    entered: {
        opacity: 1,
        transform: 'translateX(0)',
        transition: '.5s ease',
    },
    exiting: {
        opacity: 0,
        transform: 'translateX(70vw)',
        transition: '.5s ease'
    },
    exited: {
        opacity: 0,
        transform: 'translateX(70vw)',
        transition: '.5s ease'
    },
};

// TODO: add currentSlider logic for Ukrainian locale.

const Showreel = () => {

    // const slider = useRef(null)
    // const sliderContainer = useRef(null)
    const [isShowreelPlaying, setIsShowreelPlaying] = useState(false)

    const playShowreel = () => {
        setIsShowreelPlaying(true)
    }

    const [currentPage, setCurrentPage] = useCustomContext(CONTEXT_KEYS.PAGE)
    // const [currentSlide,] = useCustomContext(CONTEXT_KEYS.SLIDE)
    const showreel = getShowreelSource(useCustomContext(CONTEXT_KEYS.SANITY_DATA)[0].awsMedia)

    // useEffect(() => {

    //     const sliderRef = sliderContainer.current.props.children().props.children[1].ref.current;

    //     if (!sliderRef) {
    //         return
    //     }

    //     if (currentSlide === -1) {
    //         return sliderRef.slickGoTo(0)
    //     }

    //     if (currentSlide < SHOWREEL_SLIDES) {
    //         sliderRef.slickGoTo(currentSlide)
    //     } else {
    //         setCurrentPage(currentPage + 1)
    //     }


    // }, [currentSlide])

    return (
        <Context.Consumer>
            {() => {
                return (
                    <div className={`${styles.showreel} DNASlider`}>
                        {
                            !isShowreelPlaying && (
                                <Header />
                            )
                        }
                        <span className={styles.showreelBackground}>
                            {currentPage === 0 && showreel && (
                                <VideoPlayer
                                    controls={isShowreelPlaying}
                                    source={showreel?.fileURL}
                                    onCloseFullProject={() => setIsShowreelPlaying(false)}
                                    isShowreelPlayer
                                />
                            )}
                        </span>

                        {
                            !isShowreelPlaying && (
                                <span className={styles.shadow}></span>
                            )
                        }

                        {/* <Transition in={currentSlide < 0} timeout={0}>
                            {(state) => ( */}
                                <div className={styles.showreelControls} style={{
                                    // @ts-ignore
                                    // ...transitionShowreelControlsStyles[state],
                                    display: isShowreelPlaying ? 'none' : 'flex',
                                }}>
                                    <img src="/logo.svg" className={styles.showreelLogo} alt="" />
                                    <Button
                                        style={{ margin: '20px 0 0 -12px' }}
                                        icon="/play-icon.svg"
                                        label='Watch showreel'
                                        onClick={playShowreel}
                                    />
                                </div>
                            {/* )}
                        </Transition> */}

                        {
                            !isShowreelPlaying && (
                                <>

                                    {/* <Transition in={currentSlide >= 0} timeout={0} ref={sliderContainer}>
                                        {state => (
                                            <div className={styles.showreelSliderContainer} style={{
                                                // @ts-ignore
                                                ...transitionSliderContainerStyles[state],
                                            }}>
                                                <span className={styles.DNAtitle}>наш днк</span>
                                                <Slider ref={slider} {...sliderSettings} >
                                                    {DNA_LIST.map((dna, index) => (
                                                        <ShowreelDNA key={`${dna.title}`} {...dna} index={index + 1} />
                                                    ))}
                                                </Slider>
                                            </div>
                                        )}
                                    </Transition> */}
                                    <div className={`${styles.footer} container gx-0`}>
                                        <p>
                                        Ukrainian Full-cycle Video Production
                                        </p>
                                        <div className={styles.skipButton} onClick={() => setCurrentPage(currentPage + 1)}></div>
                                        <ul className={styles.tags}>
                                            <li><a href="#">Video Production</a></li>
                                            <li><a href="#">2D Animation</a></li>
                                            <li><a href="#">3D Animation</a></li>
                                        </ul>
                                    </div>
                                </>
                            )
                        }
                    </div>
                )
            }}
        </Context.Consumer>
    )
}

export default Showreel
