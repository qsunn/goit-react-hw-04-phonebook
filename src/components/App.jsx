import { useState } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';

import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm ';
import { Filter } from './Filter';

import { INITIAL_CONTACTS } from '../data/initialContacts';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('data', INITIAL_CONTACTS);
  const [filter, setFilter] = useState('');

  const searchHandler = filter => setFilter(filter);

  const onAddContact = newContact => {
    const isNameRepeat = contacts.filter(
      contact => contact.name === newContact.name
    ).length;
    !isNameRepeat
      ? setContacts(prevContacts => [newContact, ...prevContacts])
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
