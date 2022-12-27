import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';

import { ContactItem } from 'components/ContactItem';
import { List, Item, FailureText } from './ContactList.styled';

export const ContactList = ({ contacts }) => {
  const filter = useSelector(selectFilter);

  const getVisibleContacts = () => {
    const normalizeFilter = filter.trim().toLowerCase();

    return contacts.filter(contact =>
      contact.name.trim().toLowerCase().includes(normalizeFilter)
    );
  };
  const visibleContacts = getVisibleContacts();

  return (
    <>
      {visibleContacts.length === 0 && (
        <FailureText>There is no such contact</FailureText>
      )}
      <List>
        {visibleContacts.map(({ id, name, phone }) => {
          return (
            <Item key={id}>
              <ContactItem id={id} name={name} phone={phone} />
            </Item>
          );
        })}
      </List>
    </>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ).isRequired,
};
