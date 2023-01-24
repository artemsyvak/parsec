import { Col, Container, Row } from 'react-bootstrap';
import { useForm, ValidationError } from '@formspree/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faVimeoV } from '@fortawesome/free-brands-svg-icons'
import { faUser, faEnvelope, faMessage } from '@fortawesome/free-regular-svg-icons'

import styles from './Contact.module.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const ICON_SIZE_SM = 'sm';
const ICON_SIZE_LG = 'lg';

type IProps = {
    inView?: boolean
}

const ContactForm = ({ inView }: IProps) => {
    const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID);

    return (
        <Container className="h-100">
            <Row className={`${styles.contantFormRow} h-75 pt-5 pt-lg-0 justify-content-start justify-lg-content-center align-items-center flex-column flex-lg-row px-2 px-lg-0`}>
                <Col xl={6} md={12} className={`${styles.contactInfo} order-2 order-lg-1 mt-5 mt-lg-0 pt-5 pt-lg-0`}>
                    <a
                        style={{
                            transform: inView ? 'none' : 'translateY(-20px)',
                            opacity: inView ? 1 : 0,
                            transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) .2s`
                        }}
                        className={styles.email} href="mailto:parsec.corporative@gmail.com">parsec.corporative@gmail.com</a>
                    <a
                        style={{
                            transform: inView ? 'none' : 'translateY(20px)',
                            opacity: inView ? 1 : 0,
                            transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) .3s`
                        }}
                        className={styles.phone} href="tel:+380631241466">+38 063 12 41 466</a>

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
                                href="https://www.instagram.com/parsec_studio/" target={"_blank"} className={styles.socialLink}>
                                <div className={styles.linkIconContainer}>
                                    <FontAwesomeIcon size={ICON_SIZE_LG} icon={faInstagram as IconProp} />
                                </div>
                                Intagram
                            </a>
                        </Col>
                        <Col sm={4} xs={4} className="px-1 px-lg-3">
                            <a
                                style={{
                                    transform: inView ? 'none' : 'translateY(-20px)',
                                    opacity: inView ? 1 : 0,
                                    transition: `all .7s cubic-bezier(0.17, 0.55, 0.55, 1) .8s`
                                }}
                                href="https://www.facebook.com/parsec.studio/" target={"_blank"} className={styles.socialLink}>
                                <div className={styles.linkIconContainer}>
                                    <FontAwesomeIcon size={ICON_SIZE_LG} icon={faFacebookF as IconProp} />
                                </div>
                                Facebook
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
                <Col xl={6} md={12} className={`order-1 order-lg-2`}>
                    {state.succeeded
                        ? <p className={styles.succededMessage}>Thanks for submitting! We'll contact you soon!</p>
                        :
                        <form className={styles.contactForm} onSubmit={handleSubmit}>

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
                                />
                                <ValidationError
                                    prefix="Email"
                                    field="email"
                                    errors={state.errors}
                                />
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
                                    rows={5}
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
                                    className={styles.sendButton} type="submit" disabled={state.submitting}>
                                    Submit
                                </button>
                            </Row>

                        </form>
                    }
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
