import { PropTypes } from 'prop-types';

export const Filter = ({ searchHandler, filter }) => {
  return (
    <input
      onChange={searchHandler}
      value={filter}
      type="text"
      placeholder="Search"
      name="filter"
    />
  );
};

Filter.propTypes = {
  searchHandler: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
