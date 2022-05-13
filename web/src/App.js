import './App.css';
import { useEffect, useState } from 'react';

const url = 'http://localhost:3001/contacts';
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState();

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    const response = await fetch(url);
    const data = await response.json();

    setContacts(data);
    setNewContact('');
  };

  const addContact = async () => {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name: newContact.name, phone: newContact.phone }),
    });

    const data = await response.json();

    setContacts([...contacts, data]);
    setNewContact('');
  };

  const deleteContact = async (id) => {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const updateContact = async (id) => {
    const response = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ name: newContact.name, phone: newContact.phone }),
    });

    const data = await response.json();

    setContacts(
      contacts.map((contact) => (contact.id === id ? data : contact))
    );
    setNewContact('');
  };

  const getContact = async (id) => {
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();

    setNewContact(data.name);
  };

  return (
    <div className="App">
      <div className="App-content">
        <h1>Hello World! I'm Web App</h1>
      </div>
    </div>
  );
};

export default App;
