import React, { CSSProperties, useContext, useEffect } from "react";
import { useState, useRef } from "react";
import Context from "../../services/Context";
import { CONTEXT_KEYS, SECTION_NUMBER } from "../../enum";
// @ts-ignore
import { useWheel } from '@use-gesture/react'
// @ts-ignore
import { Lethargy } from 'lethargy'
import Spinner from "../Spinner";
import styles from './ScrollHandler.module.scss'
import { useRouter } from "next/router";
import Navigation from "../Navigation";
import useMobileDetect from "../../hooks";

const lethargy = new Lethargy(undefined, 10, undefined, 200)

const ScrollHandler = (props: any) => {

    const { isMobile } = useMobileDetect()
    
    let block = useRef(false)
    const container = useRef(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [scrollEnabled, setScrollEnable] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const routeChangeComplete = (url: any, { shallow }: any) => {
            
            if (url === '/') {
                if(isMobile()){
                    const serviceSection = document.getElementById('services')
                    serviceSection.scrollIntoView()
                }else{
                    setCurrentPage(SECTION_NUMBER.SERVICES)
                }
            }
        }

        router.events.on('routeChangeComplete', routeChangeComplete)

        return () => {
            router.events.off('routeChangeComplete', routeChangeComplete)
        }
    }, [])

    const sanityData = useContext(Context)

    const moveUp = () => {
        if (currentPage !== 0) {
            block.current = true
            setCurrentPage(currentPage - 1)
        }
    }

    const moveDown = () => {
        if (currentPage < props.children.length - 1 && currentPage !== SECTION_NUMBER.CONTACT_US) {
            block.current = true
            setCurrentPage(currentPage + 1)
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
                const loaderEl = document.getElementById('loader')
                loaderEl.style.display = 'flex'

                document.body.style.overflow = 'scroll'

                // scroll page to first page
                window.scrollBy({
                    left: 0,
                    top: -windowHeight * sectionNumber,
                    behavior: 'auto'
                })
                document.body.style.overflow = 'hidden'

                let setCurrentPageTimeout
                clearTimeout(setCurrentPageTimeout)

                // scroll page to section that was before reload
                setCurrentPageTimeout = setTimeout(() => {
                    document.body.style.overflow = 'hidden'
                    setCurrentPage(sectionNumber)
                    loaderEl.style.display = 'none'
                }, 1000)

            }

        }, 100)
    }

    const updateCurrentPage = (direction: 1 | -1) => {
        switch (direction) {
            case 1:
                return moveUp()
            case -1:
                return moveDown()
            default: return;
        }
    }

    const onTransitionEnd = (event: any) => {
        const { target } = event
        if (target.id === 'scroll-handler-container') {
            let timeout = null
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                block.current = false
            }, 500)
        }
    }

    const getContainerStyle = () => {
        return {
            height: '100%',
            position: 'relative',
            padding: 0,
            margin: 0,
            transform: `translate3d(0px, -${100 * currentPage}svh, 0px)`,
            transition: `all 1000ms ease`
        } as CSSProperties
    }

    useWheel(
        // @ts-ignore
        ({ event, last, memo: wait = false }) => {
            if (!scrollEnabled || isMobile()) return
            // @ts-ignore
            if (event.target.classList.value === 'feedback-data__text' || last) return
            event.preventDefault()
            const wheelDirection = lethargy.check(event)

            if (wheelDirection) {
                if (!wait && !block.current) {
                    updateCurrentPage(wheelDirection)
                }
                return true
            }
            return false
        },
        { target: container, eventOptions: { passive: false } }
    )

    useEffect(() => {
        if (isMobile()) {
            document.body.style.overflowY = 'scroll'
        }else{
            scrollBackAfterPageReload()
        }

    }, [])

    return (
        <div style={getContainerStyle()}
            ref={container}
            onTransitionEnd={onTransitionEnd}
            id={'scroll-handler-container'}
        >
            <Context.Provider value={{
                [CONTEXT_KEYS.PAGE]: [currentPage, setCurrentPage],
                [CONTEXT_KEYS.SANITY_DATA]: [sanityData, () => { }],
                [CONTEXT_KEYS.SCROLL_ENABLE]: [scrollEnabled, setScrollEnable]
            }}
            >
                <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

                <div id="loader" className={styles.screenLoader}>
                    <Spinner />
                </div>

                {props.children}
            </Context.Provider>
        </div>
    )
}

export default ScrollHandler;
