import { useState, useEffect } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import SearchBox from '../SearchBox/SearchBox';
import ContactList from '../ContactList/ContactList';
import initialContacts from '../../contacts.json';

import css from './App.module.css';

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContasts = window.localStorage.getItem('my-contacts');

    if (savedContasts !== null) {
      return JSON.parse(savedContasts);
    }
    return initialContacts;
  });

  const [searchContact, setSearchContact] = useState('');

  const addContact = newContact => {
    setContacts(prevContacts => {
      return [...prevContacts, newContact];
    });
  };

  const deleteContact = contactId => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== contactId);
    });
  };

  useEffect(() => {
    window.localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const foundСontacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchContact.toLowerCase()),
  );

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={searchContact} onSearch={setSearchContact} />
      <ContactList contacts={foundСontacts} onDelete={deleteContact} />
    </div>
  );
}
