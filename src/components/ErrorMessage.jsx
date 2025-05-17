import PropTypes from 'prop-types';

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default function ErrorMessage({ message }) {
  return (
    <p>
      <span>⛔️</span>
      {message}
    </p>
  );
}
