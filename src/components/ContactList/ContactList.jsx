import { useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import { useFetchContactsQuery } from 'redux/constactsSlice';
import { ContactItem } from 'components/ContactItem';
import { List, Item, FailureText } from './ContactList.styled';

export const ContactList = () => {
  const { data: contacts } = useFetchContactsQuery();
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
