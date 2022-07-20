import { SECTION_BACKGROUND } from "../../enum"
import { Container, Row, Col } from 'react-bootstrap'
import SectionTitle from '../SectionTitle'
import { InView } from "react-intersection-observer";
import styles from './Page.module.scss';

type SectionTitleProps = {
    id: string
    title: string
    subtitle: string
    index: string
}

type Props = React.FC<{
    id: string;
    style?: any;
    fluid?: boolean
    sectionTitle?: SectionTitleProps | undefined,
    background?: SECTION_BACKGROUND,
    withGridBackground?: boolean
}>

const Page: Props = ({
    children,
    id,
    style,
    background = SECTION_BACKGROUND.WHITE,
    fluid = true,
    sectionTitle,
    withGridBackground = false
}) => (
    <InView threshold={1}>
        {({ inView, ref, entry }) => (
            <div
                ref={ref}
                id={id}
                className={`section ${background} ${inView ? 'active' : ''}`}
                style={style}>
                <Container className="px-0 h-100 position-relative" fluid={fluid}>
                    {withGridBackground && (
                        <Row className={`${styles.backgroundGridContainer} px-0 mx-0 container`}>
                            {[1, 2, 3, 4].map((_, index) => (
                                <Col xl={3} key={index} className={styles.gridItem}></Col>
                            ))}
                        </Row>
                    )}
                    {sectionTitle && (
                        <Container className="px-0" id={sectionTitle.id}>
                            <SectionTitle {...sectionTitle} />
                        </Container>
                    )}
                    {children}
                </Container>
            </div>
        )}
    </InView>
)

export default Page
