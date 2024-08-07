import type { NextPage } from 'next'
import Head from 'next/head'
import Showreel from '../src/sections/Showreel'
import Services from '../src/sections/Services'
import ScrollHandler from '../src/components/ScrollHandler';
import { Container } from 'react-bootstrap';
import { SECTION_BACKGROUND } from '../src/enum';
import { SECTION_TITLES } from '../src/constants/sectionTitles';
import Page from '../src/components/Page';
import Cases from '../src/sections/Cases';
import Clients from '../src/sections/Clients';
import Team from '../src/sections/Team'
import Sanity from '../src/sanity'
import SANITY_QUERY from '../src/sanity/queries';
import Context from '../src/services/Context'
import Feedbacks from '../src/sections/Feedbacks'
import Contact from '../src/sections/Contact'
import Header from '../src/components/Header';
import useMobileDetect from '../src/hooks';
import { useEffect, useState } from 'react';


export async function getServerSideProps() {
  const fetchAwsMedia = Sanity.fetch(SANITY_QUERY.GET_AWS_MEDIA)
  const fetchServices = Sanity.fetch(SANITY_QUERY.GET_SERVICES)
  const fetchProjects = Sanity.fetch(SANITY_QUERY.GET_PROJECTS)
  const fetchProjectsOrder = Sanity.fetch(SANITY_QUERY.GET_PROJECTS_ORDER)
  const fetchClients = Sanity.fetch(SANITY_QUERY.GET_CLIENTS)
  const fetchTeam = Sanity.fetch(SANITY_QUERY.GET_TEAM)
  const fetchFeedbacks = Sanity.fetch(SANITY_QUERY.GET_FEEDBACKS)

  const [awsMedia, services, projects, projectsOrder, clients, team, feedbacks] = await Promise.all([
    fetchAwsMedia,
    fetchServices,
    fetchProjects,
    fetchProjectsOrder,
    fetchClients,
    fetchTeam,
    fetchFeedbacks
  ]);
  return { props: { awsMedia, services, projects, projectsOrder, clients, team, feedbacks } };
}


const Home: NextPage = ({
  awsMedia,
  services,
  projects,
  projectsOrder,
  clients,
  team,
  feedbacks
}: any) => {


  const { isMobile } = useMobileDetect()

  const [renderMobile, setRenderMobile] = useState(false)

  useEffect(() => {
    if (isMobile()) {
      setRenderMobile(true)
    }
  }, [])

  return (
    <div>
      <Head>
        <title>Parsec Studio</title>
        <meta name="description" content="Full-cycle video production" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container fluid className="px-0">
          <Context.Provider value={{
            awsMedia,
            services,
            projects,
            projectsOrder,
            clients,
            feedbacks,
            team,
          }}>
            <ScrollHandler>
              {renderMobile ? (
                <Header inView={true} />
              ) : null}
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
              <Page id="reviews" sectionTitle={SECTION_TITLES.FEEDBACKS} background={SECTION_BACKGROUND.WHITE}>
                <Feedbacks />
              </Page>
              {/*<Page id="team" sectionTitle={SECTION_TITLES.TEAM} background={SECTION_BACKGROUND.WHITE}>*/}
              {/*  <Team />*/}
              {/*</Page>*/}
              <Page id="contact-us" sectionTitle={SECTION_TITLES.CONTACT_US} background={SECTION_BACKGROUND.BLACK}>
                <Contact />
              </Page>
            </ScrollHandler>
          </Context.Provider>
        </Container>
      </main>
    </div>
  )
}

export default Home
