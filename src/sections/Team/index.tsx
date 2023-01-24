import { Container } from "react-bootstrap";
import Slider from "../../components/Slider";
import { CONTEXT_KEYS } from "../../enum";
import { useCustomContext } from "../../hooks";
import { Teammate } from "../../types";
import styles from './Team.module.scss'

type IProps = {
    inView?: boolean
}


const Team = ({ inView }: IProps) => {
    const team: Teammate[] = useCustomContext(CONTEXT_KEYS.SANITY_DATA)[0].team
    return (
        <Container className={`${styles.teamContainer} px-0`}
            style={{
                opacity: inView ? 1 : 0,
                transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) .2s`
            }}
        >
            <Slider settings={{
                className: 'screenSlider',
                slidesToShow: 4,
                slidesToScroll: 1,
                dots: false,
                responsive: [
                    {
                        breakpoint: 960,
                        settings: {
                            slidesToShow: 1,
                            arrows: false,
                            dots: true,
                        }
                    }
                ]
            }}
            >
                {team.map((teammate: Teammate, index: number) => (
                    <div className={`${styles.sliderImageContainer}`} key={index}>
                        <img
                            style={{
                                opacity: inView ? 1 : 0,
                                transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) .4s`
                            }}
                            src={teammate.avatar} alt={teammate.name} />
                        <h4
                            style={{
                                opacity: inView ? 1 : 0,
                                transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) .6s`
                            }}
                            className={styles.name}>{teammate.name}</h4>
                        <p
                            style={{
                                opacity: inView ? 1 : 0,
                                transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) .8s`
                            }}
                            className={styles.position}>{teammate.position}</p>
                    </div>
                ))}
            </Slider>
        </Container>
    )
}

export default Team;
