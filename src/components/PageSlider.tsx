
import { ISlideConfig, PageSlides, SlideParallaxType } from 'react-page-slides';


const PageSlider = () => {

    const slides: ISlideConfig[] = [
        {
            content: <div>first page content</div>,
            style: {
                backgroundImage: 'url("https://unsplash.com/photos/ruWkmt3nU58")'
            }
        },
        {
            content: <div>second page content</div>,
            style: {
                backgroundImage: 'url("https://unsplash.com/photos/v7daTKlZzaw")'
            }
        },
        {
            content: <div>third page content</div>,
            style: {
                backgroundImage: 'url("https://unsplash.com/photos/ugOvGh2wQY8")'
            }
        },
    ];

    return (
        <PageSlides
            enableAutoScroll={true}
            transitionSpeed={1000}
            slides={slides}
            parallax={{
                offset: 0.6,
                type: SlideParallaxType?.reveal
            }}
        />
    )

}

export default PageSlider