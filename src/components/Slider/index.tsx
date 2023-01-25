
import Slider from "react-slick"
import styles from "./Slider.module.scss"

type ResponsiveSettingsType = {
    breakpoint: number,
    settings: SettingsType
}

type SettingsType = {
    className?: string,
    dots?: boolean,
    arrows?: boolean,
    infinite?: boolean,
    speed?: number,
    slidesToShow?: number,
    slidesToScroll?: number,
    cssEase?: string,
    nextArrow?: JSX.Element,
    prevArrow?: JSX.Element,
    responsive?: ResponsiveSettingsType[],
    autoplay?: boolean,
}

type SliderProps = {
    settings?: SettingsType,
}

const defaultSettings: SettingsType = {
    className: '',
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 2,
    cssEase: 'ease',
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
}

const CustomSlider: React.FunctionComponent<SliderProps> = ({
    settings,
    children
}) => {
    const mergedSettings = {...defaultSettings, ...settings}
    mergedSettings.className = styles[settings.className]
    return (
        <Slider {...mergedSettings}>
        {children}
    </Slider>
    )
}

function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style }}
            onClick={onClick}
        />
    );
}

export default CustomSlider
