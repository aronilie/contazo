import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { Contact } from "../../features/contacts/models/Contact";
import IndividualContactStyled from "./IndividualContactStyled";
import { defaultContactImage } from "../../utils/components-utils/defaultObjects";
import { useNavigate } from "react-router-dom";
import useContactsApi from "../../features/contacts/hooks/useContactsApi";

interface ContactProps {
  contact: Contact;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const IndividualContact = ({ contact }: ContactProps): JSX.Element => {
  let contactImage = contact.backupImage;
  const navigate = useNavigate();

  const { deleteContact } = useContactsApi();

  if (!contact.backupImage) {
    contactImage = defaultContactImage;
  }

  const moveToDetails = () => {
    navigate(`/contact/${contact.phoneNumber}`);
  };

  const deleteUserContact = () => {
    deleteContact(contact.phoneNumber);
  };

  return (
    <li>
      <IndividualContactStyled className="contact">
        <img
          src={contactImage}
          alt="contact representation"
          className="contact__image"
        />
        <div className="contact__text" onClick={moveToDetails}>
          <div className="contact__fullname">
            <span className="contact__name">{contact.name}</span>
            <span className="contact__surname">{contact.surname}</span>
          </div>

          <span className="contact__email">{contact.email}</span>
          <span className="contact__phoneNumber">{contact.phoneNumber}</span>
        </div>

        <FontAwesomeIcon
          className="contact__icon"
          icon={faCircleXmark}
          onClick={deleteUserContact}
          data-testid="icon"
        />
      </IndividualContactStyled>
    </li>
  );
};

export default IndividualContact;
