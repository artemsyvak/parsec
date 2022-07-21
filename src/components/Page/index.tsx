import { FunctionComponent } from "react"
import { SECTION_BACKGROUND } from "../../enum"
import { Container } from 'react-bootstrap'
import SectionTitle from '../SectionTitle'

type SectionTitleProps = {
    title: string
    subtitle: string
    index: string
}

type Props = FunctionComponent<{    
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
    <div className={`section ${background}`} id={id} style={style}>
        <Container className="px-0 h-100 position-relative" fluid={fluid}>
            {sectionTitle && (
                <Container className="px-0">
                    <SectionTitle {...sectionTitle} />
                </Container>
            )}
            {children}
        </Container>
    </div>
)

export default Page
