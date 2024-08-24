import { useState, useEffect } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import SearchBox from '../SearchBox/SearchBox';
import ContactList from '../ContactList/ContactList';
import initialContacts from '../../contacts.json';
import { nanoid } from 'nanoid';
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
    const isDuplicateName = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase(),
    );

    const isDuplicateNumber = contacts.some(
      contact => contact.number === newContact.number,
    );

    if (isDuplicateName) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    if (isDuplicateNumber) {
      alert(`Number ${newContact.number} is already in contacts.`);
      return;
    }

    const contactWithId = { ...newContact, id: nanoid() };
    setContacts(prevContacts => [...prevContacts, contactWithId]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== contactId);
    });
  };

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
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
