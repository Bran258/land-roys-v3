import ContactChannels from "../../components/contact/ContactChannels";
import ContactFormSection from "../../components/contact/ContactFormSection";
import ContactHero from "../../components/contact/ContactHero";
import "../../styles/contact/ContactPage.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <ContactHero />
      <ContactChannels />
      <ContactFormSection />
    </div>
  );
};

export default Contact;
