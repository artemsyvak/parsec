import { Col, Container, Row } from 'react-bootstrap';
import { useForm, ValidationError } from '@formspree/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faVimeoV } from '@fortawesome/free-brands-svg-icons'
import { faUser, faEnvelope, faMessage } from '@fortawesome/free-regular-svg-icons'

import styles from './Contact.module.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const ICON_SIZE_SM = 'sm';
const ICON_SIZE_LG = 'lg';

const ContactForm = () => {
    const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID);
    return (
        <Container className="h-100">
            <Row className="h-75 justify-content-center align-items-center">
                <Col xl={6} className={styles.contactInfo}>
                    <a className={styles.email} href="mailto:parsec.corporative@gmail.com">parsec.corporative@gmail.com</a>
                    <a className={styles.phone} href="tel:+380631241466">+38 063 12 41 466</a>

                    <p className={`${styles.socialLinksTitle} mt-4 pt-4`}>Follow us:</p>
                    <Row>
                        <Col xl={4}>
                            <div className={styles.socialLink}>
                                <a href="https://www.instagram.com/parsec_studio/" target={"_blank"}>
                                    <div className={styles.linkIconContainer}>
                                        <FontAwesomeIcon size={ICON_SIZE_LG} icon={faInstagram as IconProp} />
                                    </div>
                                    Intagram
                                </a>
                            </div>
                        </Col>
                        <Col xl={4}>
                            <div className={styles.socialLink}>
                                <a href="https://www.facebook.com/parsec.studio/" target={"_blank"}>
                                    <div className={styles.linkIconContainer}>
                                        <FontAwesomeIcon size={ICON_SIZE_LG} icon={faFacebookF as IconProp} />
                                    </div>
                                    Facebook
                                </a>
                            </div>
                        </Col>
                        <Col xl={4}>
                            <div className={styles.socialLink}>
                                <a href="https://vimeo.com/parsecagency" target={"_blank"}>
                                    <div className={styles.linkIconContainer}>
                                        <FontAwesomeIcon size={ICON_SIZE_LG} icon={faVimeoV as IconProp} />
                                    </div>
                                    Vimeo
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xl={6}>
                    {state.succeeded
                        ? <p className={styles.succededMessage}>Thanks for submitting! We'll contact you soon!</p>
                        :
                        <form className={styles.contactForm} onSubmit={handleSubmit}>

                            <div className={styles.inputContainer}>
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

                            <div className={styles.inputContainer}>
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

                            <div className={styles.inputContainer}>
                                <FontAwesomeIcon size={ICON_SIZE_SM} icon={faMessage as IconProp} />
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Your Message"
                                    rows={1}
                                />
                                <ValidationError
                                    prefix="Message"
                                    field="message"
                                    errors={state.errors}
                                />
                            </div>

                            <Row className="justify-content-center">
                                <button className={styles.sendButton} type="submit" disabled={state.submitting}>
                                    Submit
                                </button>
                            </Row>

                        </form>
                    }
                </Col>
                <p style={{color: 'white'}}>©{new Date().getFullYear()} Parsec studio</p>
            </Row>
           
        </Container>
    );
}

export default ContactForm