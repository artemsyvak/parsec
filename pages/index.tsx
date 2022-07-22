import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import Showreel from '../src/sections/Showreel'
import Services from '../src/sections/Services'
import ScrollHandler from '../src/components/ScrollHandler';
import { Container } from 'react-bootstrap';
import { SECTION_BACKGROUND } from '../src/enum';
import { SECTION_TITLES } from '../src/constants/sectionTitles';
import Page from '../src/components/Page';
import Cases from '../src/sections/Cases';
import Clients from '../src/sections/Clients';
import Sanity from '../src/sanity'
import SANITY_QUERY from '../src/constants/queries';
import Context from '../src/services/Context'
import { cacheVideoUrls } from '../src/services/VideoPrecache'


export async function getServerSideProps() {
  const fetchAwsMedia = Sanity.fetch(SANITY_QUERY.GET_AWS_MEDIA)
  const fetchServices = Sanity.fetch(SANITY_QUERY.GET_SERVICES)
  const fetchProjects = Sanity.fetch(SANITY_QUERY.GET_PROJECTS)
  const fetchClients = Sanity.fetch(SANITY_QUERY.GET_CLIENTS)

  const [awsMedia, services, projects, clients] = await Promise.all([
    fetchAwsMedia,
    fetchServices,
    fetchProjects,
    fetchClients
  ]);
  return { props: { awsMedia, services, projects, clients } };
}


const Home: NextPage = ({
  awsMedia,
  services,
  projects,
  clients,
}: any) => {


  // TODO: Implement video caching & servise worker for that.
  // useEffect(() => {
  //   async function registerServiceWorker() {
  //     if ('serviceWorker' in navigator) {
  //       try {
  //         await navigator.serviceWorker.register('/sw.js');
  //         console.log('Service worker registered successfully');
  //       } catch (e) {
  //         console.error('Error registering service worker', e);
  //       }
  //     } else {
  //       console.error('Browser doesn\'t support service workers');
  //     }
  //   }
  //   cacheVideoUrls(awsMedia.map((media: any) => media.fileURL))
  //   registerServiceWorker()
  // }, [])


  return (
    <div>
      <Head>
        <title>Parsec Studio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container fluid className="px-0">
          <Context.Provider value={{
            awsMedia,
            services,
            projects,
            clients,
          }}>
            <ScrollHandler>
              <Page id="showreel" fluid={false}>
                <Showreel />
              </Page>
              <Page id="services" sectionTitle={SECTION_TITLES.SERVICES} background={SECTION_BACKGROUND.BLACK}>
                <Services />
              </Page>
              <Page id="cases" sectionTitle={SECTION_TITLES.CASES} background={SECTION_BACKGROUND.WHITE}>
                <Cases />
              </Page>
              <Page id="clients" withGridBackground sectionTitle={SECTION_TITLES.CLIENTS} background={SECTION_BACKGROUND.BLACK}>
                <Clients />
              </Page>
              <Page id="feedbacks" sectionTitle={SECTION_TITLES.FEEDBACKS} background={SECTION_BACKGROUND.WHITE}>
              </Page>
            </ScrollHandler>
          </Context.Provider>
        </Container>
      </main>
    </div>
  )
}

export default Home
