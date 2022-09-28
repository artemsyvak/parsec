import { useForm, ValidationError } from '@formspree/react';
import styles from './Contact.module.scss';

const ContactForm = () => {
    const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID);
    if (state.succeeded) {
        return <p>Thanks for joining!</p>;
    }
    return (
        <form className={styles.contactForm} onSubmit={handleSubmit}>
            <input 
                id="name" 
                type="text" 
                name="name"  />  
            <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
            />         
            <input
                id="email"
                type="email"
                name="email"
            />
            <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
            />
            <textarea
                id="message"
                name="message"
            />
            <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
            />
            <button type="submit" disabled={state.submitting}>
                Submit
            </button>
        </form>
    );
}

export default ContactForm