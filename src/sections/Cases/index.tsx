import styles from './Cases.module.scss'
import { Container, Row, Col } from 'react-bootstrap'
import VideoPlayer from '../../components/VideoPlayer'
import Context from '../../services/Context'
import { useCustomContext } from '../../hooks'
import { CONTEXT_KEYS, SECTION_NUMBER } from '../../enum'
import { useState, useEffect } from 'react'
import Sanity from '../../sanity'
import SANITY_QUERY from '../../constants/queries'

type Project = {
    title: string,
    projectType: string,
    detailedInfoTitle: string,
    detailedInfoDescription: any,
    scrennshots: any,
    videoUrl: any,
}

const Cases = () => {
    const [currentPage,] = useCustomContext(CONTEXT_KEYS.PAGE)
    const [projects, setProjects] = useState<Project[]>([])
    const awsMedia = useCustomContext(CONTEXT_KEYS.AWS_MEDIA)[0]
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    console.log(selectedProject)

    useEffect(() => {
        if (projects.length > 0) {
            setSelectedProject(projects[0])
        }
    }, [projects])

    useEffect(() => {

        async function fetchProjects() {
            try {
                const data = await Sanity.fetch(SANITY_QUERY.GET_PROJECTS)
                if (data) {
                    setProjects(
                        data.map((project: Project) => ({
                            ...project,
                            videoUrl: awsMedia.find((media: any) => media.title === project.title)?.fileURL || ''
                        }))
                    )
                }
            } catch (error) {
                console.error(error)
            }
        }

        if (awsMedia && awsMedia.length > 0) {
            fetchProjects()
        }

    }, [awsMedia])

    return (
        <Context.Consumer>
            {() => (
                <Container className={styles.casesContainer}>

                    <div className={styles.video}>
                        {currentPage === SECTION_NUMBER.CASES && selectedProject && (
                            <VideoPlayer source={selectedProject.videoUrl}  controls/>
                        )}
                    </div>

                    <Row className={`${styles.casesList}`}>
                        {projects.length > 0 && projects.slice(0, 4).map((project: Project) => (
                            <Col
                                key={project.title}
                                xl={3}                 
                                              
                                className={`${styles.caseItem} ${selectedProject?.title === project.title ? styles.active : ''}`}
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
