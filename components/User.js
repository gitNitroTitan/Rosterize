/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';

export default function User({
  name, email, image, lastLogin,
}) {
  return (
    <>
      <div className="profile-card">
        <div>User</div>
        <div>Name: {name}</div>
        <div>Email: {email}</div>
        <div>Image: <img
          src={image}
          alt={name}
          style={{
            margin: '10px auto ',
            width: '85%',
            height: '60%',
          }}
        />
        </div>
        <div>LastLogin: {lastLogin}</div>
      </div>
    </>
  );
}

User.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.string,
  lastLogin: PropTypes.string,
};

User.defaultProps = {
  name: 'John',
  email: 'blabla@email.com',
  image: 'https://media1.giphy.com/media/ZtMkorgeyRu5q/200w.gif?cid=82a1493bp86gd572cklybuzdd0y24rt1ea0p0ih3wpxjfggw&rid=200w.gif&ct=g',
  lastLogin: '01/01/1800 14:00:00',
};
