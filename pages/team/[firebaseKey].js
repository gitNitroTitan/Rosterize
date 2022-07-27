import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { getTeamPlayers } from '../../api/teamData';

function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getTeamPlayers(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);

  return (
    <div className="team-cards">
      <Card className="indCard" style={{ width: '25rem', margin: '10px', borderRadius: '2%' }}>
        <Card.Img variant="top" src={teamDetails.logoUrl} alt={teamDetails.name} style={{ height: '400px' }} />
        <Card.Body>
          <Card.Title>{teamDetails.name}</Card.Title>
          <p className="card-subtitle mb-2 text-muted">{teamDetails.conference}</p>
          <Link href={`/team/edit/${teamDetails.firebaseKey}`} passHref>
            <Button className="edit-btn" variant="info">EDIT</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ViewTeam;
