import ScrollButton from "../shared/ScrollButton";
import ContactDetails from "./ContactDetails";
import ContactForm from "./ContactForm";
import MapIntegration from "./MapIntegration";


const Contact = () => {
    return (
        <div className="bg-[#000924] text-[#42f5f5]">
            <ContactForm />
            <MapIntegration />
            <ContactDetails />
            <ScrollButton />
        </div>
    );
};

export default Contact;