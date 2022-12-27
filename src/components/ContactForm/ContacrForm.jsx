import PropTypes from 'prop-types';
import { useState } from 'react';
import { useAddContactMutation } from 'redux/constactsSlice';
import { Notify } from 'notiflix';
import { PulseLoader } from 'react-spinners';
import { Form, Label, Input, Button } from './ContactForm.styled';

export function ContactForm({ contacts }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addContact, { isSuccess, isLoading: isAdding, error }] =
    useAddContactMutation();

  // console.log('isSuccess', isSuccess);
  // console.log('isError', isError);
  // console.log('isLoading', isLoading);
  // console.log('error', error);
  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'phone':
        setPhone(value);
        break;

      default:
        throw new Error("There isn't such option");
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const isNameAdded = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    const isNumberAdded = contacts.some(contact => contact.phone === phone);

    if (isNameAdded) {
      Notify.failure(`${name} is alredy in contacts`);
      return;
    } else if (isNumberAdded) {
      Notify.failure(`${phone} is alredy in contacts`);
      return;
    }

    try {
      await addContact(name, phone);
      Notify.success('Contact added!');
    } catch (error) {
      Notify.failure(' Something went wrong...Try reloading the page');
    }

    setName('');
    setPhone('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          value={name}
          placeholder="Ivanov Ivan"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          maxLength={20}
          onChange={handleChange}
        />
      </Label>

      <Label>
        Number
        <Input
          type="tel"
          name="phone"
          value={phone}
          placeholder="111-11-111"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          maxLength={20}
          onChange={handleChange}
        />
      </Label>

      <Button type="submit" disabled={isAdding}>
        Add contact
        {isAdding && <PulseLoader size={2} color="#fff" margin={1} />}
      </Button>
    </Form>
  );
}

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ).isRequired,
};
