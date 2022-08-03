import React, { CSSProperties, useContext, useEffect, WheelEvent } from "react";
import { useState, useRef } from "react";
import Context from "../../services/Context";
import { CONTEXT_KEYS } from "../../enum";
import { SHOWREEL_SLIDES } from "../../constants";
import { useEventListener } from "../../hooks";

const ScrollHandler = (props: any) => {

    let touchStart = useRef(0)
    let prevWheelDelta = useRef(0)
    let block = useRef(false)
    const container = useRef(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [currentSlide, setCurrentSlide] = useState(-1)

    const sanityData = useContext(Context)

    useEffect(() => {
        resetInitialPositionOfShowreelSlider()
    }, [currentPage])

    useEffect(() => {
        let timeout: any = null
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            block.current = false
        }, 700)

        return () => clearTimeout(timeout)
    }, [currentSlide])

    const moveUp = () => {
        if (currentPage !== 0) {
            setCurrentPage(currentPage - 1)
            block.current = true
        }
        if (currentPage === 0 && currentSlide <= SHOWREEL_SLIDES && currentSlide !== -1) {
            setCurrentSlide(currentSlide - 1)
            block.current = true
        }
    }

    const moveDown = () => {
        if (currentPage === 0 && currentSlide < SHOWREEL_SLIDES) {
            setCurrentSlide(currentSlide + 1)
            block.current = true
        } else if (currentPage < props.children.length - 1) {
            setCurrentPage(currentPage + 1)
            block.current = true
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
                block.current = true
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

            if (scrollY >= windowHeight && sectionNumber !== 0) {
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

        }, 100)
    }

    const handleMouseWheel = (event: WheelEvent) => {                
        // @ts-ignore
        if(event.target.classList.value !== 'feedback-data__text'){
            event.preventDefault()
             // @ts-ignore
            const delta = event.wheelDelta || -event.deltaY;
            if (!block.current) {
                if (Math.abs(prevWheelDelta.current) < Math.abs(delta) || delta % 120 === 0) {
                    updateCurrentPage(delta < 0);
                }
            }
            prevWheelDelta.current = delta;
        }       
    }

    const handleKeyDown = (event: KeyboardEvent) => {        
        if (!block.current) {
            switch (event.key) {
                case "ArrowUp":
                    updateCurrentPage(false);
                    break;
                case "ArrowDown":
                    updateCurrentPage(true);
                    break;
            }
        }
    }

    const handleTouchStart = (event: any) => {
        touchStart.current = event.touches[0].pageY;
    }

    const handleTouchMove = (event: any) => {
        event.preventDefault();
        if (!block.current) {
            const touchDelta = event.touches[0].pageY - touchStart.current;
            if (Math.abs(touchDelta) > 30) {
                updateCurrentPage(touchDelta < 0);
                touchStart.current = event.touches[0].pageY;
            }
        }
    }

    const updateCurrentPage = (nextPage: boolean) => {
        if (nextPage) {
            moveDown()
        } else {
            moveUp()
        }
    }

    const onTransitionEnd = (event: any) => {
        const { target } = event
        if (target.id === 'scroll-handler-container') {
            block.current = false
        }
    }

    const getContainerStyle = () => {
        return {
            height: '100%',
            position: 'relative',
            touchAction: 'none',
            padding: 0,
            margin: 0,
            transform: `translate3d(0px, -${100 * currentPage}vh, 0px)`,
            transition: `all 1200ms ease`,
        } as CSSProperties
    }

    useEventListener(container.current, 'wheel', handleMouseWheel)
    useEventListener(container.current, 'DOMMouseScroll', handleMouseWheel)
    useEventListener(container.current, 'keydown', handleKeyDown)
    useEventListener(container.current, 'touchstart', handleTouchStart)
    useEventListener(container.current, 'touchmove', handleTouchMove)

    return (
        <div style={getContainerStyle()}
            ref={container}
            onTransitionEnd={onTransitionEnd}
            id={'scroll-handler-container'}
        >
            <Context.Provider value={{
                [CONTEXT_KEYS.PAGE]: [currentPage, setCurrentPage],
                [CONTEXT_KEYS.SLIDE]: [currentSlide, setCurrentSlide],
                [CONTEXT_KEYS.SANITY_DATA]: [sanityData, () => { }]
            }}
            >
                {props.children}
            </Context.Provider>
        </div>
    )
}

export default ScrollHandler;
