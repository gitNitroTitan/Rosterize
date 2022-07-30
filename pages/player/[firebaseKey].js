import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { viewPlayerDetails } from '../../api/mergedData';
import { deletePlayer } from '../../api/playerData';

function ViewPlayer() {
  const [playerDetails, setPlayerDetails] = useState({});
  const router = useRouter();
  const deleteIndPlayer = (playerObjects, onUpdate) => {
    if (window.confirm(`Delete ${playerObjects.name}?`)) {
      deletePlayer(playerObjects.firebaseKey).then(() => onUpdate());
    }
  };

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewPlayerDetails(firebaseKey).then(setPlayerDetails);
  }, [firebaseKey]);

  return (
    <div className="player-cards">
      <Card className="card" style={{ width: '25rem', margin: '10px', borderRadius: '2%' }}>
        <Card.Img variant="top" src={playerDetails.imageUrl} alt={playerDetails.name} style={{ height: '400px' }} />
        <Card.Body>
          <Card.Title>{playerDetails.name}</Card.Title>
          <p className="card-subtitle mb-2 text-muted">{playerDetails.position}</p>
          <p className="card-subtitle mb-2 text-muted">{playerDetails.teamName}</p>
          <p className="card-subtitle mb-2 text-muted">{playerDetails.teamObject?.name}</p>
          <Link href={`/player/edit/${playerDetails.firebaseKey}`} passHref>
            <Button className="edit-btn" variant="info">EDIT</Button>
          </Link>
          <Button variant="danger" onClick={deleteIndPlayer} className="m-2">
            DELETE
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ViewPlayer;
