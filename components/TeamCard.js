import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteTeam } from '../api/teamData';

function TeamCard({ teamObj, onUpdate }) {
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.name}?`)) {
      deleteTeam(teamObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '25rem', margin: '10px', borderRadius: '2%' }}>
      <Card.Img variant="top" src={teamObj.logoUrl} alt={teamObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{teamObj.name}</Card.Title>
        <p className="card-subtitle mb-2 text-muted">{teamObj.conference}</p>
        <Link href={`/team/${teamObj.firebaseKey}`} passHref>
          <Button variant="success">VIEW TEAM DETAILS</Button>
        </Link><br />
        <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisTeam} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    name: PropTypes.string,
    logoUrl: PropTypes.string,
    conference: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
// TeamCard.defaultProps = {
//   teamObj: PropTypes.shape({
//     name: 'Titans',
//     logoUrl: 'https://media1.giphy.com/media/ZtMkorgeyRu5q/200w.gif?cid=82a1493bp86gd572cklybuzdd0y24rt1ea0p0ih3wpxjfggw&rid=200w.gif&ct=g',
//     conference: 'NFL',
//     firebaseKey: '123',
//   }),
// };
export default TeamCard;
