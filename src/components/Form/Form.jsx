import { useState } from 'react';
import PropTypes from 'prop-types';
import s from "./Form.module.css";

export default function Form({ contacts, onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
    
  const contactMatching = () => {
    const isContact = !!(contacts.find(contact => contact.name === name || contact.number === number));

    if (isContact) {
      alert(`${name}${number} is already in contacts`);
      return true;
    }

    if (name === '' || number === '') {
      alert('Please enter all data');
      return true;
    }
  };

         
         

   const handleSubmit = e => {
        e.preventDefault();

        // Reset
        setName('');
        setNumber('');
     
        if (contactMatching()) {
        return;
        }

        onSubmit(name, number);  
    }
 

    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <label className={s.label}>
            Name
            <input
                type="text"
                name="name"
                value={name}
                placeholder="Alex BC"
                onChange={e => setName(e.currentTarget.value)}
                className={s.input}
            />
            </label>
            <label className={s.label}>
            Number
            <input
                type="tel"
                name="number"
                value={number}
                placeholder="+38 (096) 6833554"
                onChange={e => setNumber(e.currentTarget.value)}
                className={s.input}
            />
            </label>
            <button type="submit" className={s.button}>Add contact</button>
        </form>)
    }


 Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};