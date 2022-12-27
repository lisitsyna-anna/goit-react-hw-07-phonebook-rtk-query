import PropTypes from 'prop-types';
import { HiPhone } from 'react-icons/hi';
import { useDeleteContactMutation } from 'redux/constactsSlice';
import { PulseLoader } from 'react-spinners';

import { Button } from 'components/ContactForm/ContactForm.styled';
import { StyledText } from './ContactItem.styled';
import { Notify } from 'notiflix';

export const ContactItem = ({ id, name, phone }) => {
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  const handleDelete = () => {
    deleteContact(id)
      .unwrap()
      .then(() => Notify.success('Contact deleted!'))
      .catch(() =>
        Notify.failure('Somethinf went wrong... Try reload the page')
      );
  };

  return (
    <>
      <StyledText>
        <HiPhone size={16} />
        <b>{name}:</b> {phone}
      </StyledText>
      <Button type="button" onClick={handleDelete} disabled={isDeleting}>
        Delete
        {isDeleting && <PulseLoader size={2} color="#fff" margin={1} />}
      </Button>
    </>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
