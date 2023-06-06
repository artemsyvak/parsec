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
                    {project.detailedInfoDescription?.map((paragraph: string, index: number) => (
                        <Col sm={6} className="px-2" key={index}>
                            <p>{paragraph}</p>
                        </Col>
                    ))}
                </Row>

                {
                    project?.screenshots?.length > 0 && (
                        <Slider settings={{
                            className: 'screenSlider',
                            responsive: [
                                {
                                    breakpoint: 960,
                                    settings: {
                                        slidesToShow: 1,
                                        slidesToScroll: 1,
                                        arrows: false,
                                        dots: true,
                                    }
                                }
                            ]
                        }}>
                            {project.screenshots.map((screenshot: string, index: number) => (
                                <div className={styles.sliderImageContainer} key={index}

                                >
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <img src={screenshot} alt={project.title} />
                                    </div>

                                </div>
                            ))}
                        </Slider>
                    )
                }
            </Container>
        </div>
    )
}

export default Details
