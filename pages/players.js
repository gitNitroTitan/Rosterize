import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getPlayers } from '../api/playerData';
// import { useAuth } from '../utils/context/authContext';
import PlayerCard from '../components/PlayerCard';

function Players() {
  const [players, setPlayers] = useState([]);
  // const { user } = useAuth();

  const getAllPlayers = () => {
    getPlayers().then(setPlayers);
  };

  useEffect(() => {
    getAllPlayers();
  }, []);

  return (
    <>
      <h1>Team</h1>
      <div className="text-center my-4">
        <Link href="/player/new" passHref>
          <Button variant="warning">Add A Player</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {players.map((player) => (
            <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllPlayers} />
          ))}
        </div>
      </div>
    </>
  );
}
export default Players;
