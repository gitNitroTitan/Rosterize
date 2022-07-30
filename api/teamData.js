import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getTeams = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const deleteTeam = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/teams/${firebaseKey}.json`)
    .then(() => {
      getTeams().then((teamsArray) => resolve(teamsArray));
    })
    .catch((error) => reject(error));
});

const getSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teams/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createTeam = (teamObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/teams.json`, teamObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/teams/${response.data.name}.json`, payload)
        .then(() => {
          getTeams().then(resolve);
        });
    }).catch(reject);
});

const updateTeam = (teamDetails) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/teams/${teamDetails.firebaseKey}.json`, teamDetails)
    .then(() => getTeams(teamDetails.uid).then(resolve))
    .catch((error) => reject(error));
});

const getTeamPlayers = (teamId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players.json?orderBy= "teamId" &equalTo="${teamId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});
export {
  getTeams, deleteTeam, createTeam, updateTeam, getSingleTeam, getTeamPlayers,
};
