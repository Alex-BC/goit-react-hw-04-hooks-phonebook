import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Section from '../Section/Section.jsx';
import Form from '../Form/Form.jsx';
import Filter from '../Filter/Filter.jsx';
import ContactList from '../ContactList/ContactList.jsx';

const initialContacts = [
  { id: 'id-1', name: 'Elon Mask', number: '10664888778' },
  { id: 'id-2', name: 'Lena Kharchenko', number: '380664969795' },
  { id: 'id-3', name: 'Bill Gates', number: '10662475771' },
  { id: 'id-4', name: 'Mark Zuckerberg ', number: '10625884318' },
];

export default function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

      if (parsedContacts) {
        setContacts(parsedContacts);
      }

      isFirstRender.current = false;
      return;
      }
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

     setContacts([contact, ...contacts]);
  };

  // changeFilter = e => {
  //   this.setState({ filter: e.currentTarget.value });
  // };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

   const visibleContacts = getVisibleContacts();

    return (
      <>
        <Section title="Phonebook">
          <Form onSubmit={addContact} contacts={contacts} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={e => setFilter(e.currentTarget.value)} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={deleteContact}
          />
        </Section>
      </>
    );
  }

