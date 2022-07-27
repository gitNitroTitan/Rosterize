import { getPlayersByTeam, deletePlayer } from './playerData';
import { getSingleTeam, deleteTeam, getTeamPlayers } from './teamData';

const viewPlayersByTeam = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleTeam(firebaseKey)
    .then((teamObject) => {
      getPlayersByTeam(teamObject.firebaseKey)
        .then((playerObject) => {
          resolve(Object.values(playerObject));
        });
    }).catch((error) => reject(error));
});

const deleteTeamPlayers = (firebaseKey, uid) => new Promise((resolve, reject) => {
  getTeamPlayers(firebaseKey).then((playerArray) => {
    const deletePlayerPromises = playerArray.map((player) => deletePlayer(player.firebaseKey));
    Promise.all(deletePlayerPromises).then(() => {
      deleteTeam(firebaseKey, uid).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewPlayersByTeam, deleteTeamPlayers };
