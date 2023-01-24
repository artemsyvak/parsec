import { Container } from "react-bootstrap";
import Slider from "../../components/Slider";
import { CONTEXT_KEYS } from "../../enum";
import { useCustomContext } from "../../hooks";
import { Feedback } from "../../types";
import styles from './Feedbacks.module.scss'

type IProps = {
    inView?: boolean
}

const Feedbacks = ({ inView }: IProps) => {
    const feedbacks: Feedback[] = useCustomContext(CONTEXT_KEYS.SANITY_DATA)[0].feedbacks
    return (
        <Container className={`${styles.feedbacksContainer} px-2 px-lg-0`}
        style={{
            opacity: inView ? 1 : 0,
            transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) .2s`
        }}
        >
            <Slider settings={{
                className: 'screenSlider',
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 960,
                        settings: {
                            slidesToShow: 1,
                            arrows: false,
                        }
                    }
                ]
            }}
            >
                {feedbacks.map((feedback: Feedback, index: number) => (
                    <div                        
                        className={`${styles.feedbackContainer} p-3`} key={index}>

                        <div className={styles.feedbackText}
                        style={{
                            opacity: inView ? 1 : 0,
                            transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) 1.${((index + 1) * .1) - .5}s`
                            
                        }}
                        >
                            {feedback.feedbackText.map((text: string, index: number) => (
                                <p className={'feedback-data__text'} key={index}>{text}</p>
                            ))}
                        </div>

                        <div className={styles.feedbackFooter}
                        style={{
                            opacity: inView ? 1 : 0,
                            transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) 1.${((index + 1) * .1) - .5}s`                            
                        }}
                        >
                            {/* {feedback.avatar && (
                                <img className={styles.avatar} src={feedback.avatar} alt={feedback.name} />
                            )} */}
                            {feedback.company_avatar && (
                                <img className={styles.company_avatar} src={feedback.company_avatar} alt={feedback.name} />
                            )}
                            {/* <h4 className={styles.name}>{feedback.name}</h4>
                            <p className={styles.position}>{feedback.position}</p> */}
                        </div>


                    </div>
                ))}
            </Slider>
        </Container>
    )
}

export default Feedbacks;
