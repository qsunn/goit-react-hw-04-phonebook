import { useState, useEffect } from 'react';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm ';
import { Filter } from './Filter';
import { INITIAL_CONTACTS } from '../initialContacts';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('data'));
    if (!data) {
      setContacts(INITIAL_CONTACTS);
      return;
    }
    setContacts(data);
  }, []);

  useEffect(() => {
    if (!contacts.length) return;
    window.localStorage.setItem('data', JSON.stringify(contacts));
  }, [contacts]);

  const searchHandler = filter => setFilter(filter);

  const onAddContact = newContact => {
    const isNameUnique = contacts.filter(contact => contact.name === newContact.name).length;
    !isNameUnique
      ? setContacts([newContact, ...contacts])
      : alert(`${newContact.name} already exists`);
  };

  const deleteContact = id => {
    const newContacts = contacts.filter(contact => contact.id !== id);
    setContacts(newContacts);
  };

  return (
    <div className="container">
      <h1 className="title">Phonebook</h1>
      <ContactForm onAddContact={onAddContact} />
      <h2 className="title">Contacts</h2>
      <Filter searchHandler={searchHandler} />
      <ContactList
        contacts={contacts}
        filter={filter}
        deleteContact={deleteContact}
      />
    </div>
  );
};
