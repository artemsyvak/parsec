import styles from './Cases.module.scss'
import { Container, Row, Col } from 'react-bootstrap'
import VideoPlayer from '../../components/VideoPlayer'
import Context from '../../services/Context'
import { useCustomContext } from '../../hooks'
import { CONTEXT_KEYS, SECTION_NUMBER } from '../../enum'
import { useState, useMemo } from 'react'
import { SECTION_TITLES, SECTION_NAMES } from '../../constants/sectionTitles'
import Details from './Details'
import { Project } from '../../types'

const sectionTitleHeight = '238px'

const Cases = () => {
    const [currentPage,] = useCustomContext(CONTEXT_KEYS.PAGE)
    const projectsSources = useCustomContext(CONTEXT_KEYS.SANITY_DATA)[0].awsMedia
    let projects: Project[] = useCustomContext(CONTEXT_KEYS.SANITY_DATA)[0].projects.map((project: Project) => {
        return {
            ...project,
            videoUrl: projectsSources.find((source: any) => source.title === project.title).fileURL
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
        if(currentProjectIndex + nextProjectIndex < 0){
            setSelectedProject(projects[projects.length - 1])
        }else if(currentProjectIndex + nextProjectIndex > (projects.length - 1)){
            setSelectedProject(projects[0])
        }else{
            setSelectedProject(projects[currentProjectIndex + nextProjectIndex])
        }
    }

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
                                onDetailedInfoOpen={() => setIsDetailsOpen(true)}
                            />
                        )}
                    </div>

                    {
                        isDetailsOpen && <Details onClose={() => setIsDetailsOpen(false)} onProjectChange={onProjectChange} project={selectedProject} />
                    }

                    <Row className={`${styles.casesList}`}>
                        {projects.length > 0 && projects.slice(0, 4).map((project: Project) => (
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
                </Container>
            )}
        </Context.Consumer>

    )
}

export default Cases
