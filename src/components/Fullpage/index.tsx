import React, { useEffect } from "react";
import { useState, useRef } from "react";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import Context from "../../services/Context";
import { CONTEXT_KEYS } from "../../enum";
import { SHOWREEL_SLIDES } from "../../constants";

import styles from './Fullpage.module.scss'

const Fullpage = (props: any) => {

    const container = useRef(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [currentSlide, setCurrentSlide] = useState(-1)

    useEffect(() => {
        // move page container by transforming Y positioning
        container.current.style.transform = `translateY(-${100 * currentPage}vh)`
    }, [currentPage])

    useEffect(() => {
        resetInitialPositionOfShowreelSlider()
    }, [currentPage])

    useEffect(() => {
        scrollBackAfterPageReload()
    }, [])

    const moveUp = () => {
        if (currentPage !== 0) {
            setCurrentPage(currentPage - 1)
        }
        if (currentPage === 0 && currentSlide <= SHOWREEL_SLIDES && currentSlide !== -1) {
            setCurrentSlide(currentSlide - 1)
        }
    }

    const moveDown = () => {
        if (currentPage === 0 && currentSlide < SHOWREEL_SLIDES) {
            setCurrentSlide(currentSlide + 1)
        } else if (currentPage < props.children.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    // back to initial state of showreel screen after leave from it
    const resetInitialPositionOfShowreelSlider = () => {
        if (currentPage === 1) {
            let timemout
            
            clearTimeout(timemout)
            timemout = setTimeout(() => {
                setCurrentSlide(0)
                setCurrentSlide(-1)
            }, 500)
        }
    }

    const scrollBackAfterPageReload = () => {
        let timeout;
        clearTimeout(timeout)

        timeout = setTimeout(() => { 
            // calculate current section depending on window height and scroll after page reload.    
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY
            const sectionNumber = scrollY / windowHeight                        
    
            if(scrollY >= windowHeight && sectionNumber !== 0){ 
                // enable body scrolling
                document.body.style.overflow = 'scroll'
                
                // scroll page to first page
                window.scroll(0, -windowHeight * sectionNumber)  
                document.body.style.overflow = 'hidden'               
                
                let setCurrentPageTimeout
                clearTimeout(setCurrentPageTimeout)
                
                // scroll page to section that was before reload
                setCurrentPageTimeout = setTimeout(() => {
                    document.body.style.overflow = 'hidden'
                    setCurrentPage(sectionNumber)  
                }, 0)
            }
                
        }, 150)
    }

    return (
        <div className={styles.fullpageContainer} ref={container}>
            <Context.Provider value={{
                [CONTEXT_KEYS.PAGE]: [currentPage, setCurrentPage],
                [CONTEXT_KEYS.SLIDE]: [currentSlide, setCurrentSlide]
            }}
            >
                <ReactScrollWheelHandler
                    upHandler={moveUp}
                    downHandler={moveDown}
                    timeout={800}
                >
                    {props.children}
                </ReactScrollWheelHandler>
            </Context.Provider>
        </div>
    )
}

export default Fullpage;
