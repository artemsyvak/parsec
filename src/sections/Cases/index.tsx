import styles from './Cases.module.scss'
import { Container, Row, Col } from 'react-bootstrap'
import VideoPlayer from '../../components/VideoPlayer'
import Context from '../../services/Context'
import { useCustomContext } from '../../hooks'
import { CONTEXT_KEYS, SECTION_NUMBER } from '../../enum'
import { useState, useMemo, useEffect } from 'react'
import { SECTION_TITLES, SECTION_NAMES } from '../../constants/sectionTitles'
import Details from './Details'
import { Project } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

const sectionTitleHeight = '238px'
const PROJECTS_PER_PAGE = 4

const Cases = () => {
    const [currentPage,] = useCustomContext(CONTEXT_KEYS.PAGE)
    const projectsSources = useCustomContext(CONTEXT_KEYS.SANITY_DATA)[0].awsMedia
    let projects: Project[] = useCustomContext(CONTEXT_KEYS.SANITY_DATA)[0].projects.map((project: Project) => {
        return {
            ...project,
            videoUrl: projectsSources.find((source: any) => source._id === project.videoId)?.fileURL
        }
    })

    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [selectedProject, setSelectedProject] = useState<Project>(projects[0])
    const [isFullProjectOpen, setIsFullProjectOpen] = useState<boolean>(false)
    const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false)

    const casesContainerHeight = useMemo(() => {
        return isFullProjectOpen ? '100vh' : `calc(100vh - ${sectionTitleHeight})`
    }, [isFullProjectOpen])

    const openFullProject = (project: Project) => {
        setSelectedProject(project)
        setIsFullProjectOpen(true)
        const sectionTitleEl = document.getElementById(SECTION_TITLES[SECTION_NAMES.CASES].id)
        sectionTitleEl.style.height = '0'
    }

    const onCloseFullProject = () => {
        setIsFullProjectOpen(false)
        const sectionTitleEl = document.getElementById(SECTION_TITLES[SECTION_NAMES.CASES].id)
        sectionTitleEl.style.height = sectionTitleHeight
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
        if (currentSlide === 0 || (currentSlide - PROJECTS_PER_PAGE) < 0) return
        setCurrentSlide(currentSlide - PROJECTS_PER_PAGE)
    }

    const onNextSlide = () => {
        if (currentSlide === projects.length || (currentSlide + PROJECTS_PER_PAGE) > (projects.length - 1)) return
        setCurrentSlide(currentSlide + PROJECTS_PER_PAGE)
    }

    useEffect(() => {
        setSelectedProject(projects[currentSlide])
    }, [currentSlide])

    // useEffect(() => {
    //     if(currentPage !== SECTION_NUMBER.CASES && isFullProjectOpen){
    //         setIsFullProjectOpen(false)
    //     }
    // }, [currentPage, isFullProjectOpen])

    return (
        <Context.Consumer>
            {() => (
                <Container className={styles.casesContainer} style={{ height: casesContainerHeight }}>

                    <div className={styles.video}>
                        {currentPage === SECTION_NUMBER.CASES && selectedProject && (                           
                            <VideoPlayer
                                source={selectedProject.videoUrl}
                                controls={isFullProjectOpen}
                                onCloseFullProject={onCloseFullProject}                                
                                isFullProjectOpen={isFullProjectOpen}
                                isProjectDetailsOpen={isDetailsOpen}
                                onDetailedInfoOpen={() => setIsDetailsOpen(true)}
                            />
                        )}
                    </div>

                    {
                        isDetailsOpen && <Details onClose={() => setIsDetailsOpen(false)} onProjectChange={onProjectChange} project={selectedProject} />
                    }

                    <Row className={`${styles.casesList}`}>
                        {projects.length > 0 && 
                            projects
                                .slice(currentSlide, currentSlide + PROJECTS_PER_PAGE)
                                .map((project: Project) => (
                                    <Col
                                        key={project.title}
                                        xl={3}
                                        style={{ zIndex: isFullProjectOpen ? 0 : 1 }}
                                        className={`${styles.caseItem} ${selectedProject?.title === project.title ? styles.active : ''}`}
                                        onClick={() => openFullProject(project)}
                                        onMouseEnter={() => setSelectedProject(project)}
                                    >
                                        <h4>{project.title}</h4>
                                        <p>{project.projectType}</p>
                                    </Col>
                                )
                                )}
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

                            {currentSlide !== (projects.length - 1) && (
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
