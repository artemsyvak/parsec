import React, { FunctionComponent, PropsWithChildren, ReactNode, useEffect } from "react";
import { useState, useRef } from "react";
import { useEventListener, useDebounce, usePrevious } from "../../hooks";
import throttle from 'lodash/throttle';


import styles from './Fullpage.module.scss'

const directions = {
    FORWARD: 'FORWARD',
    BACKWARD: 'BACKWARD',
    NONE: 'NONE'
}

let scrolling = false

const Fullpage = (props: any) => {

    const { children } = props;
    const count = children && children.length ? children.length : 0;

    const container = useRef(null)
    const [stateDirection, setDirection] = useState(directions.NONE)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [nextIndex, setNextIndex] = useState(count ? 1 : 0)
    const [prevIndex, setPrevIndex] = useState(count ? count - 1 : 0) 
    // const [scrolling, setScrolling] = useState(false)
    // const debounceIndex = useDebounce(currentIndex, )    


    const handleScroll = (e: any) => { 
        e.preventDefault();
        const { deltaY } = e;        

        let direction = directions.NONE;
        if (deltaY < 0) {
          direction = directions.FORWARD
        }
        if (deltaY > 0) {
          direction = directions.BACKWARD
        }
        setNextSlideThrottled(direction);         
    }

    const setNextSlide = (direction: any) => {        
        const {children = null} = props
        if (!children || children.length <= 1) {
            return null;
        }

        const count = children.length;
        let newIndex = 0

        if (direction === directions.NONE) {
            return null;
        }

        if (direction === directions.FORWARD) {
            if (currentIndex < count - 1) {
              newIndex = currentIndex + 1;
            } else {
              newIndex = 0;
            }
        }

        if (direction === directions.BACKWARD) {
            if (currentIndex === 0) {
              newIndex = count - 1;
            } else {
              newIndex = currentIndex - 1;
            }
        }

        let newNextIndex = newIndex === count - 1 ? 0 : newIndex + 1;
        let newPrevIndex = newIndex === 0 ? count - 1 : newIndex - 1;

        // newIndex = currentIndex === 0 && nextIndex > 1 ? 0 : newIndex

        setCurrentIndex(newIndex)
        setNextIndex(newNextIndex)
        setPrevIndex(newPrevIndex)       

        const koef = direction === directions.BACKWARD ? 1 : -1

        if(!scrolling){

            window.requestAnimationFrame(() => {
                console.log('animation frame')
                window.scrollBy({
                    top: window.innerHeight * koef ,
                    left: 0,
                    behavior: 'smooth'
                })
                scrolling = false
            })

            console.log('animation frame end')

            scrolling = true
        }
        

        console.log('scrolling:', scrolling, 'current:', currentIndex, 'prev:', prevIndex, 'next:',  nextIndex)
    }

    const setNextSlideThrottled = throttle(setNextSlide, 1000, {
        leading: true,
        trailing: false,
    })

    useEffect(() => {        
        window.removeEventListener('mousewheel', handleScroll)
        window.addEventListener('mousewheel', handleScroll, {passive: false})
        return () => window.removeEventListener('mousewheel', handleScroll)
    }, [])

    // const [offset, setOffset] = useState(0);

    // const updateOffset = () => {
    //     setOffset(window.pageYOffset)
    // }

    // const updateThrottleOffset = throttle(updateOffset, 1000, {
    //     leading: true,
    //     trailing: false
    // })

    // useEffect(() => {
    //     const onScroll = () => updateThrottleOffset()
    //     // clean up code
    //     window.removeEventListener('scroll', onScroll);
    //     window.addEventListener('scroll', onScroll, { passive: true });
    //     return () => window.removeEventListener('scroll', onScroll);
    // }, []);

    // console.log(offset); 

    return (
        <div className={styles.fullpageContainer}>
            {props.children}
        </div>        
    )
}

export default Fullpage;
