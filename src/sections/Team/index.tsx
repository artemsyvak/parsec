import { Container } from "react-bootstrap";
import Slider from "../../components/Slider";
import { CONTEXT_KEYS } from "../../enum";
import { useCustomContext } from "../../hooks";
import { Teammate } from "../../types";
import styles from './Team.module.scss'

const Team = () => {
    const team: Teammate[] = useCustomContext(CONTEXT_KEYS.SANITY_DATA)[0].team
    return (
        <Container className={`${styles.teamContainer} px-0`}>
            <Slider settings={{
                className: 'screenSlider',
                slidesToShow: 4,
                slidesToScroll: 1,
                dots: false
            }}
            >
                {team.map((teammate: Teammate, index: number) => (
                    <div className={`${styles.sliderImageContainer}`} key={index}>
                        <img src={teammate.avatar} alt={teammate.name} />                        
                        <h4 className={styles.name}>{teammate.name}</h4>
                        <p className={styles.position}>{teammate.position}</p>
                    </div>
                ))}
            </Slider>
        </Container>
    )
}

export default Team;