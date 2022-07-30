import { getSingleTeam, deleteTeam, getTeamPlayers } from './teamData';
import { getSinglePlayer, deletePlayer } from './playerData';

const viewPlayerDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  getSinglePlayer(teamFirebaseKey)
    .then((playerObj) => {
      getSingleTeam(playerObj.teamId).then((teamObject) => {
        resolve({ teamObject, ...playerObj });
      });
    })
    .catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamPlayers(teamFirebaseKey)])
    .then(([teamObject, teamPlayerArray]) => {
      resolve({ ...teamObject, players: teamPlayerArray });
    }).catch((error) => reject(error));
});

const deleteTeamPlayers = (teamId) => new Promise((resolve, reject) => {
  getTeamPlayers(teamId)
    .then((playerArray) => {
      const deletePlayerPromises = playerArray.map((player) => deletePlayer(player.firebaseKey));
      Promise.all(deletePlayerPromises).then(() => {
        deleteTeam(teamId).then(resolve);
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
