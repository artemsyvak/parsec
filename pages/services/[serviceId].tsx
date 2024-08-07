import { useRouter } from 'next/router'
import Head from 'next/head'
import { Container } from 'react-bootstrap';
import { CONTEXT_KEYS, SECTION_BACKGROUND, SECTION_NUMBER } from '../../src/enum';
import { SECTION_TITLES } from '../../src/constants/sectionTitles';
import Page from '../../src/components/Page';
import Cases from '../../src/sections/Cases';
import Sanity from '../../src/sanity'
import SANITY_QUERY from '../../src/sanity/queries';
import Context from '../../src/services/Context'
import { SERVICE_TYPE } from '../../src/enum'
import ServiceDescription from '../../src/components/Service/ServiceDescription'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export async function getServerSideProps() {
  const fetchAwsMedia = Sanity.fetch(SANITY_QUERY.GET_AWS_MEDIA)
  const fetchServices = Sanity.fetch(SANITY_QUERY.GET_SERVICES)
  const fetchProjects = Sanity.fetch(SANITY_QUERY.GET_PROJECTS)
  const fetchProjectsOrder = Sanity.fetch(SANITY_QUERY.GET_PROJECTS_ORDER)

  const [awsMedia, services, projects, projectsOrder] = await Promise.all([
    fetchAwsMedia,
    fetchServices,
    fetchProjects,
    fetchProjectsOrder
  ]);
  return { props: { awsMedia, services, projects, projectsOrder} };
}

const Service = ({
  awsMedia,
  services,
  projects,
  projectsOrder
}: any) => {
  const router = useRouter()
  const { serviceId } = router.query

  const getSectionTitleByService = (serviceId: string) => {
    switch (serviceId) {
      case SERVICE_TYPE.VIDEO_PRODUCTION:
        return SECTION_TITLES.VIDEO_PRODUCTION_SERVICE
      case SERVICE_TYPE['2D_ANIMATION']:
        return SECTION_TITLES.TWO_D_ANIMATION_SERVICE
      case SERVICE_TYPE['3D_ANIMATION']:
        return SECTION_TITLES.THREE_D_ANIMATION_SERVICE
    }
  }

  const getServiceDescription = (services: any) =>
    services.find((service: any) =>
      service.serviceType === serviceId)?.detailedInfoDescription

  return (
    <div>
      <Head>
        {/* @ts-ignore */}
        <title>Parsec Studio | {getSectionTitleByService(serviceId).title}</title>
        <meta name="description" content="Full-cycle video production" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container fluid className="px-0">
          <Context.Provider value={{
            [CONTEXT_KEYS.PAGE]: [SECTION_NUMBER.CASES, () => { }],
            [CONTEXT_KEYS.SANITY_DATA]: [{
              awsMedia,
              services,
              projects,
              projectsOrder
            }, () => { }],
            [CONTEXT_KEYS.SCROLL_ENABLE]: [undefined, () => { }]
          }}>            
            <Page
              id="services-detailed-page"
              // @ts-ignore
              sectionTitle={getSectionTitleByService(serviceId)}
              background={SECTION_BACKGROUND.WHITE}
            >

              <Link href="/">
                <div className="back-to-home">
                  <FontAwesomeIcon size='lg' icon={faChevronLeft} />
                </div>
              </Link>

              <ServiceDescription description={getServiceDescription(services)} />
              <Cases />
            </Page>
          </Context.Provider>
        </Container>
      </main>
    </div>
  )
}

export default Service
