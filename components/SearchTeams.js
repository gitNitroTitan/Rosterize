import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function SearchTeams({ teams, setFilteredTeams }) {
  const [searchInput, setSearchInput] = useState('');
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    const filteredResults = teams.filter((team) => team.name.toLowerCase().includes(value.toLowerCase()) || team.position.toLowerCase().includes(value.toLowerCase()));
    setFilteredTeams(filteredResults);
  };

  return (
    <>
      <input placeholder="Search" value={searchInput} onChange={handleChange} />
    </>
  );
}
SearchTeams.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    conference: PropTypes.string,
  })).isRequired,
  setFilteredTeams: PropTypes.func.isRequired,
};
