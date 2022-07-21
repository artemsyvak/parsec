import React, { useEffect, createContext } from "react";
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


    // TODO: handle reload page => return to first page
    // useEffect(() => {

    //     setTimeout(() => {
    //         const windowHeight = window.innerHeight;
    //         const scrollY = window.scrollY
    //         console.log(windowHeight, scrollY)
    
    //         if(scrollY >= windowHeight){
    //             setCurrentPage(scrollY / windowHeight)  
    //         }
    //     }, 0)
       
    // }, [])

    useEffect(() => {
        container.current.style.transform = `translateY(-${100 * currentPage}vh)`
    }, [currentPage])

    useEffect(() => {
        if (currentPage === 1) {
            setCurrentSlide(0)
            setCurrentSlide(-1)
        }
    }, [currentPage])

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
                    timeout={1000}
                >
                    {props.children}
                </ReactScrollWheelHandler>
            </Context.Provider>
        </div>
    )
}

export default Fullpage;
