import styles from './Cases.module.scss'
import { Container, Row, Col } from 'react-bootstrap'
import VideoPlayer from '../../components/VideoPlayer'
import Context from '../../services/Context'
import useMobileDetect, { useCustomContext } from '../../hooks'
import { CONTEXT_KEYS, SECTION_NUMBER } from '../../enum'
import { useState, useMemo, useEffect } from 'react'
import { SECTION_TITLES, SECTION_NAMES } from '../../constants/sectionTitles'
import Details from './Details'
import { Project } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

const PROJECTS_PER_PAGE = 4
const SECTION_XS_PADDING = '9.5vh'

type IProps = {
    inView?: boolean
}

const Cases = ({ inView }: IProps) => {
    const router = useRouter()
    const { serviceId } = router.query
    const { isMobile } = useMobileDetect()
    const [renderMobile, setRenderMobile] = useState(false)

    const [sectionTitleHeight, setSectionTitleHeight] = useState('238px')
    const [serviceDescriptionHeight, setServiceDescriptionHeight] = useState('225px')
    const [projectsPerPage, setProjectsPerPage] = useState(PROJECTS_PER_PAGE)

    useEffect(() => {
        if (isMobile()) {
            setSectionTitleHeight(`calc(190px + ${SECTION_XS_PADDING})`)
            setServiceDescriptionHeight(`calc(225px + ${SECTION_XS_PADDING})`)
            setProjectsPerPage(PROJECTS_PER_PAGE / 2)
            setRenderMobile(true)
        }
    }, [])

    const [currentPage,] = useCustomContext(CONTEXT_KEYS.PAGE)
    const [, setScrollEnable] = useCustomContext(CONTEXT_KEYS.SCROLL_ENABLE)
    const projectsSources = useCustomContext(CONTEXT_KEYS.SANITY_DATA)[0].awsMedia
    let projects: Project[] = useCustomContext(CONTEXT_KEYS.SANITY_DATA)[0].projects.map((project: Project) => {
        return {
            ...project,
            videoUrl: projectsSources.find((source: any) => source._id === project.videoId)?.fileURL
        }
    })

    if (serviceId) {
        projects = projects.filter((project: Project) => project.serviceType === serviceId)
    }

    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [selectedProject, setSelectedProject] = useState<Project>(projects[0])
    const [isFullProjectOpen, setIsFullProjectOpen] = useState<boolean>(false)
    const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false)

    const toggleServiceDescriptionDisplay = (display: boolean) => {
        const serviceDescriptionEl = document.getElementById('service-description')
        serviceDescriptionEl.style.display = display ? 'block' : 'none'
    }

    const casesContainerHeight = useMemo(() => {
        return isFullProjectOpen ? !renderMobile ? '100vh' : '91vh' : `calc(100vh - ${sectionTitleHeight} - ${serviceId ? serviceDescriptionHeight : '0px'})`
    }, [isFullProjectOpen, sectionTitleHeight, serviceDescriptionHeight, serviceId, renderMobile])

    const openFullProject = (project: Project) => {
        setSelectedProject(project)
        setIsFullProjectOpen(true)
        const sectionTitleEl = document.getElementById(serviceId ? 'services-title' : SECTION_TITLES[SECTION_NAMES.CASES].id)
        sectionTitleEl.style.display = 'none'

        if (serviceId) {
            toggleServiceDescriptionDisplay(false)
        }

    }

    const onCloseFullProject = () => {
        setIsFullProjectOpen(false)
        const sectionTitleEl = document.getElementById(serviceId ? 'services-title' : SECTION_TITLES[SECTION_NAMES.CASES].id)
        sectionTitleEl.style.display = 'block'

        if (serviceId) {
            toggleServiceDescriptionDisplay(true)
        }
    }

    const onProjectChange = (nextProjectIndex: number) => {
        const currentProjectIndex = projects.findIndex((project: Project) => project.title === selectedProject.title)
        if (currentProjectIndex + nextProjectIndex < 0) {
            setSelectedProject(projects[projects.length - 1])
        } else if (currentProjectIndex + nextProjectIndex > (projects.length - 1)) {
            setSelectedProject(projects[0])
        } else {
            setSelectedProject(projects[currentProjectIndex + nextProjectIndex])
        }
    }

    const onPrevSlide = () => {
        if (currentSlide === 0 || (currentSlide - projectsPerPage) < 0) return
        setCurrentSlide(currentSlide - projectsPerPage)
    }

    const onNextSlide = () => {
        if (currentSlide === projects.length || (currentSlide + projectsPerPage) > (projects.length - 1)) return
        setCurrentSlide(currentSlide + projectsPerPage)
    }

    const onDetailsOpen = () => {
        setIsDetailsOpen(true)
        setScrollEnable(false)
    }

    const onDetailsClose = () => {
        setIsDetailsOpen(false)
        setScrollEnable(true)
        onCloseFullProject?.()
    }

    useEffect(() => {
        setSelectedProject(projects[currentSlide])
    }, [currentSlide])

    useEffect(() => {
        if (!inView && isFullProjectOpen) {
            onCloseFullProject()
            setIsDetailsOpen(false)
        }
    }, [inView, isFullProjectOpen])

    return (
        <Context.Consumer>
            {() => (
                <Container className={styles.casesContainer} style={{ height: casesContainerHeight }}>

                    <div className={styles.video}>
                        {(currentPage === SECTION_NUMBER.CASES || inView) && selectedProject && (
                            <VideoPlayer
                                source={selectedProject.videoUrl}
                                controls={isFullProjectOpen}
                                onCloseFullProject={onCloseFullProject}
                                isFullProjectOpen={isFullProjectOpen}
                                isProjectDetailsOpen={isDetailsOpen}
                                onDetailedInfoOpen={onDetailsOpen}
                            />
                        )}
                    </div>

                    {
                        isDetailsOpen && <Details onClose={onDetailsClose} onProjectChange={onProjectChange} project={selectedProject} />
                    }

                    <Row className={`${styles.casesList}`}>
                        {
                            projects.length > 0 && projects?.slice(currentSlide, currentSlide + projectsPerPage)
                                .map((project: Project, index: number) => (
                                    <Col
                                        style={{
                                            zIndex: isFullProjectOpen ? 0 : 102,
                                            // transform: inView ? "none" : "translateX(-50px)",
                                            // opacity: inView ? 1 : 0,
                                            // transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) .${index + 2}s`
                                        }}
                                        key={project.title}
                                        lg={3}
                                        xs={6}
                                        className={`${styles.caseItem} ${selectedProject?.title === project.title ? styles.active : ''}`}
                                        onClick={() => openFullProject(project)}
                                        onMouseEnter={() => setSelectedProject(project)}
                                    >
                                        <h4>{project.title}</h4>
                                        <p>{project.projectType}</p>
                                    </Col>
                                )

                                )

                        }
                    </Row>
                    {!isFullProjectOpen && (
                        <div className={styles.projectArrows}>
                            {currentSlide !== 0 && (
                                <button
                                    className={styles.prev}
                                    onClick={onPrevSlide}
                                >
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </button>
                            )}

                            {currentSlide !== (projects.length - 1) && projects.length > (currentSlide + projectsPerPage) && (
                                <button
                                    className={styles.next}
                                    onClick={onNextSlide}
                                >
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </button>
                            )}

                        </div>
                    )}
                </Container>
            )}
        </Context.Consumer>

    )
}

export default Cases
