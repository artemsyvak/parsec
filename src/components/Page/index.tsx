import { FunctionComponent, useRef } from "react"
import { SECTION_BACKGROUND } from "../../enum"
import { Container } from 'react-bootstrap'
import SectionTitle from '../SectionTitle'
import { InView } from "react-intersection-observer";

type SectionTitleProps = {
    title: string
    subtitle: string
    index: string
}

type Props = React.FC<{
    id: string;
    style?: any;
    fluid?: boolean
    sectionTitle?: SectionTitleProps | undefined,
    background?: SECTION_BACKGROUND
}>

const Page: Props = ({
    children,
    id,
    style,
    background = SECTION_BACKGROUND.WHITE,
    fluid = true,
    sectionTitle
}) => (
    <InView threshold={1}>
        {({ inView, ref, entry }) => (
            <div
                ref={ref} 
                id={id}
                className={`section ${background} ${inView ? 'active' : ''}`}
                style={style}>
                <Container className="px-0 h-100 position-relative" fluid={fluid}>
                    {sectionTitle && (
                        <Container className="px-0">
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
