/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getPlayers } from '../api/playerData';
import { useAuth } from '../utils/context/authContext';
import PlayerCard from '../components/PlayerCard';
import Search from '../components/Search';

export default function Players() {
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [players, setPlayers] = useState([]);
  const { user } = useAuth();

  const getAllPlayers = () => {
    getPlayers(user.uid).then((playersArray) => {
      setPlayers(playersArray);
      setFilteredPlayers(playersArray);
    });
  };

  useEffect(() => {
    getAllPlayers();
  }, [user.uid]);

  return (
    <>
      <h1>Team</h1>
      <div className="text-center my-4">
        <Search players={players} setFilteredPlayers={setFilteredPlayers} />
        <div className="text-center my-4">
          <Link href="/player/new" passHref>
            <Button variant="warning">Add A Player</Button>
          </Link>
          <div className="d-flex flex-wrap">
            {filteredPlayers.map((player) => (
              <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllPlayers} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
