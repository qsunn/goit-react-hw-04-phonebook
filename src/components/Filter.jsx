import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useEffect } from 'react';

export const Filter = ({ searchHandler }) => {
  const [filter, setFilter] = useState('');

  useEffect(() => {
    searchHandler(filter);
  }, [filter, searchHandler]);

  return (
    <input
      onChange={e => setFilter(e.target.value)}
      value={filter}
      type="text"
      placeholder="Search"
      name="filter"
    />
  );
};

Filter.propTypes = {
  searchHandler: PropTypes.func.isRequired,
};
