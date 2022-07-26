import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Search({ players, setFilteredPlayers }) {
  const [searchInput, setSearchInput] = useState('');
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    const filteredResults = players.filter((player) => player.name.toLowerCase().includes(value.toLowerCase()) || player.position.toLowerCase().includes(value.toLowerCase()));
    setFilteredPlayers(filteredResults);
  };

  return (
    <>
      <input placeholder="Search" value={searchInput} onChange={handleChange} />
    </>
  );
}
Search.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
  })).isRequired,
  setFilteredPlayers: PropTypes.func.isRequired,
};
