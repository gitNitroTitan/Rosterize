import React from 'react';
import Card from 'react-bootstrap/Card';
import User from '../components/User';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

function Profile() {
  const { user } = useAuth();
  console.warn(user);
  return (
    <Card style={{
      width: '18rem', height: '500px', textAlign: 'center', margin: '100px auto', borderRadius: '2%',
    }}
    >
      <User
        name={user.displayName}
        email={user.email}
        image={user.photoURL}
        lastLogin={user.metadata.lastSignInTime}
      />
      <button className="profile-button" type="button" onClick={signOut}>Sign Out</button>
    </Card>
  );
}

export default Profile;
