import React, { useEffect } from "react";
import { useState, useRef } from "react";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";


import styles from './Fullpage.module.scss'

const Fullpage = (props: any) => {

    const container = useRef(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        container.current.style.transform = `translateY(-${100 * currentIndex}vh)` 
    }, [currentIndex])


    const moveUp = () => {
        if(currentIndex !== 0){
            setCurrentIndex(currentIndex - 1)
        }
    }

    const moveDown = () => {
        if(currentIndex < props.children.length - 1){
            setCurrentIndex(currentIndex + 1)
        }
    }

    return (
        <div className={styles.fullpageContainer} ref={container}>
            <ReactScrollWheelHandler
                upHandler={moveUp}
                downHandler={moveDown}
                timeout={700}
            >
                {props.children}
            </ReactScrollWheelHandler>
        </div>
    )
}

export default Fullpage;
