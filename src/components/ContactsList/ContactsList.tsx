import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import useContactsApi from "../../features/contacts/hooks/useContactsApi";
import Button from "../Button/Button";
import IndividualContact from "../IndividualContact/IndividualContact";
import { ContactsListStyled, ListContainerStyled } from "./ContactsListStyled";

const ContactsList = (): JSX.Element => {
  const { getContacts } = useContactsApi();
  const contacts = useAppSelector((state) => state.contacts);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const thereAreContacts = contacts.length !== 0;

  return (
    <>
      {!thereAreContacts ? (
        <span>You have no contacts yet.</span>
      ) : (
        <ListContainerStyled>
          <div className="list">
            <ContactsListStyled>
              <div className="header">
                <h1 className="title">Contacts</h1>
                <div className="link-create">
                  <Link to="/create">
                    <Button
                      className="button-create"
                      disabled={false}
                      text="Create contact"
                      type="submit"
                    />
                  </Link>
                </div>
              </div>

              <div className="index">
                <span className="index__name">Name</span>
                <span className="index__email">Email</span>
                <span className="index__phoneNumber">Phone number</span>
              </div>
              {contacts.map((contact) => (
                <IndividualContact
                  contact={contact}
                  key={contact.phoneNumber}
                />
              ))}
            </ContactsListStyled>
          </div>
        </ListContainerStyled>
      )}
    </>
  );
};

export default ContactsList;
