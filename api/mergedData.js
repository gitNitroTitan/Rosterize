import { getSingleTeam, deleteTeam, getTeamPlayers } from './teamData';
import { getSinglePlayer, deletePlayer } from './playerData';

const viewPlayerDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSinglePlayer(firebaseKey)
    .then((playerObj) => {
      getSingleTeam(playerObj.team_id).then((teamObject) => {
        resolve({ teamObject, ...playerObj });
      });
    })
    .catch((error) => reject(error));
});

const viewTeamDetails = (firebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(firebaseKey), getTeamPlayers(firebaseKey)])
    .then(([teamObject, teamPlayerArray]) => {
      resolve({ ...teamObject, players: teamPlayerArray });
    }).catch((error) => reject(error));
});

const deleteTeamPlayers = (firebaseKey, uid) => new Promise((resolve, reject) => {
  getTeamPlayers(firebaseKey)
    .then((playerArray) => {
      const deletePlayerPromises = playerArray.map((player) => deletePlayer(player.firebaseKey));
      Promise.all(deletePlayerPromises).then(() => {
        deleteTeam(firebaseKey, uid).then(resolve);
      });
    })
    .catch((error) => reject(error));
});

const getThisTeamsPlayers = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleTeam(firebaseKey)
    .then((teamObject) => {
      getTeamPlayers(teamObject.firebaseKey)
        .then((playerObject) => {
          resolve({ playerObject, ...teamObject });
        });
    }).catch((error) => reject(error));
});
export {
  viewPlayerDetails, viewTeamDetails, deleteTeamPlayers, getThisTeamsPlayers,
};
