import { SECTION_BACKGROUND } from "../../enum"
import { Container, Row, Col } from 'react-bootstrap'
import SectionTitle from '../SectionTitle'
import { InView } from "react-intersection-observer";
import styles from './Page.module.scss';
import { Children, cloneElement, useEffect } from "react";

type SectionTitleProps = {
    id: string
    title: string
    subtitle?: string
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
}) => {
    return(
    <InView threshold={0.65}>
        {({ inView, ref, entry }) => (
            <div
                ref={ref}
                id={id}
                className={`section  ${background} ${inView ? 'active' : ''}`}
                style={style}>
                <Container className="px-0  position-relative" fluid={fluid}>
                    {withGridBackground && (
                        <Row className={`${styles.backgroundGridContainer} px-0 mx-0 container`}>
                            {[1, 2, 3, 4].map((_, index) => (
                                <Col
                                    style={{
                                        height: inView ? '100svh' : 0,
                                        opacity: inView ? 1 : 0,
                                        transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1)`
                                    }}
                                    xl={3}
                                    key={index}
                                    className={styles.gridItem}>
                                </Col>
                            ))}
                        </Row>
                    )}
                    {sectionTitle && (
                        <Container className="px-0" id={sectionTitle.id}>
                            <SectionTitle {...sectionTitle} inView={inView} backgroundColor={background}/>
                        </Container>
                    )}
                    {Children.map(children, child => {
                        // @ts-ignore
                        return cloneElement(child, { inView })
                    })}
                </Container>
            </div>
        )}
    </InView>
)}

export default Page
