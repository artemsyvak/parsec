import { Container } from "react-bootstrap";
import Slider from "../../components/Slider";
import { CONTEXT_KEYS } from "../../enum";
import { useCustomContext } from "../../hooks";
import { Feedback } from "../../types";
import styles from './Feedbacks.module.scss'

const Feedbacks = () => {
    const feedbacks: Feedback[] = useCustomContext(CONTEXT_KEYS.SANITY_DATA)[0].feedbacks
    // TODO: update when all feedbacks will be added
    const copiedFeedbacks = [...feedbacks, ...feedbacks, ...feedbacks, ...feedbacks, ...feedbacks, ...feedbacks]
    return (
        <Container className={`${styles.feedbacksContainer} px-0`}>
            <Slider settings={{
                className: 'screenSlider',
                slidesToShow: 3,
                slidesToScroll: 1,
            }}
            >
                {copiedFeedbacks.map((feedback: Feedback, index: number) => (
                    <div className={`${styles.feedbackContainer} p-3`} key={index}>

                        <div className={styles.feedbackText}>
                            {feedback.feedbackText.map((text: string, index: number) => (
                                <p className={'feedback-data__text'} key={index}>{text}</p>
                            ))}
                        </div>

                        <div className={styles.feedbackFooter}>
                            <img className={styles.avatar} src={feedback.avatar} alt={feedback.name} />
                            <img className={styles.company_avatar} src={feedback.company_avatar} alt={feedback.name} />
                            <h4 className={styles.name}>{feedback.name}</h4>
                            <p className={styles.position}>{feedback.position}</p>
                        </div>


                    </div>
                ))}
            </Slider>
        </Container>
    )
}

export default Feedbacks;