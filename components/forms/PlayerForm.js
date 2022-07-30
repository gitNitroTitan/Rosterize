import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPlayer, updatePlayer } from '../../api/playerData';
import { getTeams } from '../../api/teamData';

const initialState = {
  name: '',
  imageUrl: '',
  position: '',
  team: '',
};
function PlayerForm({ playerObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);
    if (playerObj.firebaseKey) setFormInput(playerObj);
  }, [playerObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.warn(handleChange);
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerObj.firebaseKey) {
      updatePlayer(formInput)
        .then(() => router.push(`/player/${playerObj.firebaseKey}`));
      console.warn(playerObj.firebaseKey);
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlayer(payload).then(() => {
        router.push('/players');
      });
    }
  };
  return (
    <div className="form">
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput1" label="Full Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter Player's Name" name="name" value={formInput.name} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Team">
          <Form.Select aria-label="Team" name="playersTeam" onChange={handleChange} className="mb-3" required>
            <option value="">Select a Team</option>
            {teams.map((team) => (
              <option
                key={team.name}
                value={team.name}
                selected={team.name === team.firebaseKey}
              >
                {team.name}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput2" label="Position" className="mb-3">
          <Form.Control type="position" placeholder="Enter position" name="position" value={formInput.position} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput3" label="Player Image" className="mb-3">
          <Form.Control type="url" placeholder="Enter an image url" name="imageUrl" value={formInput.imageUrl} onChange={handleChange} required />
        </FloatingLabel>

        <Button variant="warning" type="submit">{playerObj.firebaseKey ? 'Update' : 'Create'} Player</Button>
      </Form>
    </div>
  );
}
PlayerForm.propTypes = {
  playerObj: PropTypes.shape({
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    position: PropTypes.string,
    t: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};
PlayerForm.defaultProps = {
  playerObj: initialState,
};
export default PlayerForm;
