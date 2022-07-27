/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getTeams } from '../api/teamData';
import { useAuth } from '../utils/context/authContext';
import TeamCard from '../components/TeamCard';
import SearchTeams from '../components/SearchTeams';

export default function Teams() {
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();

  const getAllTeams = () => {
    getTeams(user.uid).then((teamsArray) => {
      console.warn(teamsArray);
      setTeams(teamsArray);
      setFilteredTeams(teamsArray);
    });
  };

  useEffect(() => {
    getAllTeams();
  }, [user.uid]);

  return (
    <>
      <h1>Team</h1>
      <div className="text-center my-4">
        <SearchTeams teams={teams} setFilteredTeams={setFilteredTeams} />
        <div className="text-center my-4">
          <Link href="/team/new" passHref>
            <Button variant="warning">Add A Team</Button>
          </Link>
          <div className="d-flex flex-wrap">
            {filteredTeams.map((team) => (
              <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTeams} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
