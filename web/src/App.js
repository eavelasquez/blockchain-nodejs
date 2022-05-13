import './App.css';
import { useEffect, useState } from 'react';

const url = 'http://localhost:3001/contacts';
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    getContacts()
  }, []);

  const getContacts = async () => {
    const response = await fetch(url, { headers });
    const data = await response.json();

    setContacts(data);
  };

  const getContact = async (id) => {
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();

    setId(data.id);
    setName(data.name);
    setPhone(data.phone);
  };

  const addContact = async () => {
    console.log({name, phone});
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name, phone }),
    });

    const data = await response.json();

    setContacts([...contacts, data]);
  };

  const updateContact = async (id) => {
    const response = await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ name, phone }),
    });

    const data = await response.json();

    setContacts(
      contacts.map((contact) => (contact.id === id ? data : contact))
    );

    setId('');
    setName('');
    setPhone('');
  };

  const deleteContact = async (id) => {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <div className="App">
      <div className="App-content">
        <h1>Contacts</h1>
        <h2>List</h2>

        <div className="App-contacts">
          {contacts.length > 0 ? (contacts.map((contact) => (
            <div key={contact.id} className="App-contact">
              <div className="App-contact-name">{contact.name}</div>
              <div className="App-contact-phone">{contact.phone}</div>
              <div className="App-contact-actions">
                <button onClick={() => getContact(contact.id)}>
                  Edit
                </button>
                <button onClick={() => deleteContact(contact.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))) : (
            <div style={{ color: 'red' }}>No contacts yet</div>
          )}
        </div>

        <h2>New Contact</h2>
        <div className="App-new-contact">
          <form>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              type="button"
              onClick={() => id ? updateContact(id) : addContact()}
              disabled={!name || !phone}
            >
              {id ? 'Update' : 'Add'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
