import css from './Button.module.css';
import propTypes from 'prop-types';

const Button = props => {
  const { loadMore } = props;
  return (
    <button className={css.button} onClick={loadMore}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  loadMore: propTypes.func,
};
