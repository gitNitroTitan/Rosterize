import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePlayer } from '../api/playerData';

function PlayerCard({ playerObj, onUpdate }) {
  const deleteThisPlayer = () => {
    if (window.confirm(`Delete ${playerObj.name}?`)) {
      deletePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <div className="player-card">
      <Card style={{ width: '25rem', margin: '10px', borderRadius: '2%' }}>
        <Card.Img variant="top" src={playerObj.imageUrl} alt={playerObj.name} style={{ height: '400px' }} />
        <Card.Body>
          <Card.Title>{playerObj.name}</Card.Title>
          <p className="card-subtitle mb-2 text-muted">{playerObj.position}<br />{playerObj.teamName}</p>
          <div className="card-body2">
            <Link href={`/player/${playerObj.firebaseKey}`} passHref>
              <Button variant="success" className="view-btn">VIEW</Button>
            </Link><br />
            <Link href={`/player/edit/${playerObj.firebaseKey}`} passHref>
              <Button variant="info" className="edit-btn">EDIT</Button>
            </Link>
            <Button variant="danger" onClick={deleteThisPlayer} className="m-2">
              DELETE
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    position: PropTypes.string,
    teamName: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlayerCard;
