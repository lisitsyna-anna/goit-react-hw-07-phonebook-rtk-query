import { FadeLoader } from 'react-spinners';
import { useFetchContactsQuery } from 'redux/constactsSlice';

import { Container } from 'components/Container';
import { ContactForm } from 'components/ContactForm';
import { Filter } from 'components/Filter';
import { ContactList } from 'components/ContactList';
import { PageTitle, SectionTitle, Text } from './App.styled';

export function App() {
  const { data: contacts, isFetching, isError } = useFetchContactsQuery();

  const showConatctList = contacts && contacts.length > 0;
  const showEmptyBook =
    contacts && contacts.length === 0 && !isFetching && !isError;

  return (
    <Container as="main">
      <Container
        as="div"
        maxWidth={1250}
        pl={15}
        pr={15}
        ml={'auto'}
        mr={'auto'}
      >
        <Container
          as="div"
          width={700}
          ml={'auto'}
          mr={'auto'}
          backgroundColor={'white'}
          p={40}
        >
          <PageTitle>Phonebook</PageTitle>

          <Container as="section" pt={30} pb={30}>
            {contacts && <ContactForm contacts={contacts} />}
          </Container>

          <Container as="section" pt={30} pb={30}>
            <SectionTitle>Contacts</SectionTitle>
            {contacts && contacts.length > 1 && <Filter />}

            {isFetching && !isError && (
              <FadeLoader
                color="#2196F3"
                cssOverride={{
                  display: 'block',
                  margin: '0 auto',
                }}
              />
            )}
            {showConatctList && <ContactList contacts={contacts} />}
            {showEmptyBook && (
              <Text>Your phonebook is empty. Please add contact.</Text>
            )}
            {isError && (
              <div style={{ margin: '0 auto', width: 400 }}>
                Something went wrong...Try reloading the page
              </div>
            )}
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
