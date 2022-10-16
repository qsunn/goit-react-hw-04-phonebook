import { PropTypes } from 'prop-types';
import { Contact } from './Contact';

export const ContactList = ({ contacts, filter, deleteContact }) => {
  const filteredContacts = contacts.filter(contact =>
    (contact.name + contact.number).toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <ul className="contacts">
      {filteredContacts.map(contact => (
        <Contact
          key={contact.id}
          contact={contact}
          deleteContact={() => deleteContact(contact.id)}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
