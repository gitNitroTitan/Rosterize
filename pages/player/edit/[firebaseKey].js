import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSinglePlayer } from '../../../api/playerData';
import PlayerForm from '../../../components/forms/PlayerForm';

export default function EditPlayer() {
  const [editPlayers, setEditPlayers] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setEditPlayers);
  }, [firebaseKey]);

  return (<PlayerForm playerObj={editPlayers} />);
}
