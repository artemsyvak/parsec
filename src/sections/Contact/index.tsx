import { Col, Container, Row } from 'react-bootstrap';
import { useForm, ValidationError } from '@formspree/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVimeoV, faUpwork } from '@fortawesome/free-brands-svg-icons'
import { faUser, faEnvelope, faMessage } from '@fortawesome/free-regular-svg-icons'

import styles from './Contact.module.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useState, useEffect } from 'react';
import useMobileDetect from '../../hooks';

const ICON_SIZE_SM = 'sm';
const ICON_SIZE_LG = 'lg';

type IProps = {
    inView?: boolean
}

const ContactForm = ({ inView }: IProps) => {

    const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID);
    const [email, setEmail] = useState('');
    const { isMobile } = useMobileDetect()
    const [renderMobile, setRenderMobile] = useState(false)

    useEffect(() => {
        if (isMobile()) {
            setRenderMobile(true)
        }
    }, [])

    const isValidEmail = (email: string) => {
      return /\S+@\S+\.\S+/.test(email);
    }

    const formHandler = (e:any) => {
      if(isValidEmail) {
        handleSubmit(e)
      }
    }

    return (
        <Container className="h-100">
            <Row className={`${styles.contantFormRow} h-75 pt-2 pt-lg-0 justify-content-start justify-lg-content-center align-items-center flex-column flex-lg-row px-2 px-lg-0`}>
                <Col xl={6} md={12} className={`${styles.contactInfo} order-2 order-lg-1 mt-3 mt-lg-0`}>
                    <a
                        style={{
                            transform: inView ? 'none' : 'translateY(-20px)',
                            opacity: inView ? 1 : 0,
                            transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) .2s`
                        }}
                        className={styles.email} href="mailto:info@parsec.studio">info@parsec.studio</a>
                    {/* <a
                        style={{
                            transform: inView ? 'none' : 'translateY(20px)',
                            opacity: inView ? 1 : 0,
                            transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) .3s`
                        }}
                        className={styles.phone} href="tel:+380631241466">+38 063 12 41 466</a> */}

                    <p
                        style={{
                            transform: inView ? 'none' : 'translateY(-10px)',
                            opacity: inView ? 1 : 0,
                            transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) .5s`
                        }}
                        className={`${styles.socialLinksTitle} mt-3 pt-0 mt-lg-4 pt-lg-4`}>Follow us:</p>
                    <Row>
                        <Col sm={4} xs={4} className="px-0 px-lg-3">
                            <a
                                style={{
                                    transform: inView ? 'none' : 'translateY(-20px)',
                                    opacity: inView ? 1 : 0,
                                    transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) .6s`
                                }}
                                href="https://www.upwork.com/agencies/1402288556994809856/" target={"_blank"} className={styles.socialLink}>
                                <div className={styles.linkIconContainer}>
                                    <FontAwesomeIcon size={ICON_SIZE_LG} icon={faUpwork as IconProp} />                                    
                                </div>
                                Upwork
                            </a>
                        </Col>
                        <Col sm={4} xs={4} className="px-1 px-lg-3">
                            <a
                                style={{
                                    transform: inView ? 'none' : 'translateY(-20px)',
                                    opacity: inView ? 1 : 0,
                                    transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) .8s`
                                }}
                                href="https://clutch.co/profile/parsec-studio-0?_gl=1*twasd5*_gcl_au*NDI5NTg4MzQ3LjE3MjM4MDQ4NjQ.*FPAU*NDI5NTg4MzQ3LjE3MjM4MDQ4NjQ.*_ga*MTcxMDM0OTQ4MS4xNzIzODA0ODY0*_ga_D0WFGX8X3V*MTcyNTM1NzU1MS4zLjEuMTcyNTM1ODEyNS42MC4wLjIzMjA2OTE3Mg..*_fplc*Q20xSExGSXdEVllqRGx0Nm5sRjQxMEZWRHhPV3pRTXV6dmZqJTJGZVRLSGRMQ2NOTVloN0ZHTFZMRTFWV28xSUxWbkJwMDYzQnVhMFBJMk5scUJhZFElMkZ6eUN5akdhcUp5WkVrc3lIUEZKVXdjNGN5bnA5bGh1WTEyY05IcWtHdyUzRCUzRA..#highlights" target={"_blank"} className={styles.socialLink}>
                                <div className={styles.linkIconContainer}>
                                    <span className={styles.clutchIcon}></span>
                                </div>
                                Clutch
                            </a>
                        </Col>
                        <Col sm={4} xs={4} className="px-0 px-lg-3">
                            <a
                                style={{
                                    transform: inView ? 'none' : 'translateY(-20px)',
                                    opacity: inView ? 1 : 0,
                                    transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) 1s`
                                }}
                                href="https://vimeo.com/parsecagency" target={"_blank"} className={styles.socialLink}>
                                <div className={styles.linkIconContainer}>
                                    <FontAwesomeIcon size={ICON_SIZE_LG} icon={faVimeoV as IconProp} />
                                </div>
                                Vimeo
                            </a>
                        </Col>
                    </Row>
                </Col>
                <Col xl={6} md={12} className={`order-1 order-lg-2 ${styles.contactFormWrapper}`}>
                  <p className={state.succeeded ? styles.succededMessageShow : styles.succededMessage}>Thanks for submitting! We'll contact you soon!</p>
                  <form className={state.succeeded ? styles.contactFormHide : styles.contactForm}>

                    <div
                      style={{
                        transform: inView ? 'none' : 'translateY(20px)',
                        opacity: inView ? 1 : 0,
                        transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) .3s`
                      }}
                      className={styles.inputContainer}>
                      <FontAwesomeIcon size={ICON_SIZE_SM} icon={faUser as IconProp} />
                      <input
                        id="name"
                        type="text"
                        placeholder="Name"
                        name="name" />
                      <ValidationError
                        prefix="Name"
                        field="name"
                        errors={state.errors}
                      />
                    </div>

                    <div
                      style={{
                        transform: inView ? 'none' : 'translateY(20px)',
                        opacity: inView ? 1 : 0,
                        transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) .5s`
                      }}
                      className={styles.inputContainer}>
                      <FontAwesomeIcon size={ICON_SIZE_SM} icon={faEnvelope as IconProp} />
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                      />
                      <div className={styles.errors}>
                        <ValidationError
                          prefix="Email"
                          field="email"
                          errors={state.errors}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        transform: inView ? 'none' : 'translateY(20px)',
                        opacity: inView ? 1 : 0,
                        transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) .7s`
                      }}
                      className={styles.inputContainer}>
                      <FontAwesomeIcon size={ICON_SIZE_SM} icon={faMessage as IconProp} />
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Your Message"
                        rows={renderMobile ? 2 : 5}
                      />
                      <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                      />
                    </div>

                    <Row className="justify-content-center">
                      <button
                        style={{
                          transform: inView ? 'none' : 'translateY(20px)',
                          opacity: inView ? 1 : 0,
                          transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) .9s`
                        }}
                        className={styles.sendButton} type="submit" disabled={state.submitting} onSubmit={formHandler}>
                        Submit
                      </button>
                    </Row>

                  </form>
                </Col>
                <p
                    className={styles.footerYear}
                    style={{
                        color: 'white',
                        transform: inView ? 'none' : 'translateY(20px)',
                        opacity: inView ? 1 : 0,
                        transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) 1.5s`
                    }}
                >©{new Date().getFullYear()} Parsec studio</p>
            </Row>

        </Container>
    );
}

export default ContactForm
