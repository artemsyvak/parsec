import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Slider from '../../../components/Slider';
import { Project } from '../../../types'

import styles from './Details.module.scss'

type Props = {
    project: Project
    onClose: () => void
    onProjectChange: (index: number) => void
}

const Details = ({ project, onClose, onProjectChange }: Props) => {
    return (
        <div className={styles.projectDetails}>
            <button className={styles.closeButton} onClick={onClose}>
                <FontAwesomeIcon size={'lg'} icon={faXmark} />
            </button>
            <Container>

                <Row className="mx-0">
                    <h2 className={`${styles.title} px-2`}> {project.detailedInfoTitle}</h2>
                </Row>

                <Row className={`${styles.descriptionContainer} mx-0`}>
                    {project.detailedInfoDescription.map((paragraph: string, index: number) => (
                        <Col sm={6} className="px-2" key={index}>
                            <p>{paragraph}</p>
                        </Col>
                    ))}
                </Row>

                {
                    project?.screenshots?.length > 0 && (
                        <Slider settings={{className: 'screenSlider'}}>
                            {project.screenshots.map((screenshot: string, index: number) => (
                                <div className={styles.sliderImageContainer} key={index}>
                                    <img src={screenshot} alt={project.title} />
                                </div>
                            ))}
                        </Slider>
                    )
                }

                <Row className={`${styles.bottomNavigation} mx-0`}>
                    <Col sm={6} className="d-flex justify-content-start align-items-center pl-2">
                        <button onClick={() => onProjectChange(-1)}>
                            Prev project
                        </button>
                    </Col>

                    <Col sm={6} className="d-flex justify-content-end align-items-center pr-2">
                        <button onClick={() => onProjectChange(1)}>
                            Next project
                        </button>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default Details
