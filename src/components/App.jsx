import { PureComponent } from 'react';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm ';
import { Filter } from './Filter';

import { INITIAL_CONTACTS } from '../initialContacts';

export class App extends PureComponent {
  state = {
    contacts: INITIAL_CONTACTS,
    filter: '',
  };

  componentDidMount() {
    const data = this.getData();
    if (!data) return;
    this.setState({ contacts: data });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.contacts !== prevState.contacts) this.setData();
  };

  getData = () => JSON.parse(localStorage.getItem('data'));

  setData = () =>
    localStorage.setItem('data', JSON.stringify(this.state.contacts));

  searchHandler = e => this.setState({ filter: e.target.value });

  onAddContact = data => {
    const filtered = this.state.contacts.filter(
      contact => contact.name === data.name
    );
    filtered.length
      ? alert(`${data.name} already exists`)
      : this.setState({ contacts: [data, ...this.state.contacts] });
  };

  deleteContact = id => {
    const filtered = this.state.contacts.filter(contact => contact.id !== id);
    this.setState({ contacts: filtered });
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          fontSize: 40,
          color: '#010101',
          padding: 32,
        }}
      >
        <h1 className="title">Phonebook</h1>
        <ContactForm onAddContact={this.onAddContact} />

        <h2 className="title">Contacts</h2>
        <Filter searchHandler={this.searchHandler} filter={filter} />
        <ContactList
          contacts={contacts}
          filter={filter}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
