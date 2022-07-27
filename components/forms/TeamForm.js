import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTeam, updateTeam } from '../../api/teamData';

const initialState = {
  name: '',
  logoUrl: '',
  conference: '',
};
function TeamForm({ teamObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (teamObj.firebaseKey) setFormInput(teamObj);
  }, [teamObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamObj.firebaseKey) {
      updateTeam(formInput)
        .then(() => router.push('/teams'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeam(payload).then(() => {
        router.push('/teams');
      });
    }
  };
  return (
    <div className="form">
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput1" label="Team Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter Team's Name" name="name" value={formInput.name} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput2" label="Conference" className="mb-3">
          <Form.Control type="conference" placeholder="Enter Conference" name="conference" value={formInput.conference} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput3" label="Team Logo Url" className="mb-3">
          <Form.Control type="url" placeholder="Enter an team logo url" name="logoUrl" value={formInput.logoUrl} onChange={handleChange} required />
        </FloatingLabel>

        <Button variant="warning" type="submit">{teamObj.firebaseKey ? 'Update' : 'Create'} Team</Button>
      </Form>
    </div>
  );
}
TeamForm.propTypes = {
  teamObj: PropTypes.shape({
    name: PropTypes.string,
    logoUrl: PropTypes.string,
    conference: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};
TeamForm.defaultProps = {
  teamObj: initialState,
};
export default TeamForm;
