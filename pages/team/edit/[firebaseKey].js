import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleTeam } from '../../../api/teamData';
import TeamForm from '../../../components/forms/TeamForm';

export default function EditTeam() {
  const [editTeams, setEditTeams] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setEditTeams);
  }, [firebaseKey]);

  return (<TeamForm teamObj={editTeams} />);
}
