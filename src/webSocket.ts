import { getCustomRepository } from 'typeorm';
import { io } from './http';
import { GetLobbyByIdService } from './services/Lobby/GetLobbyByIdService';
import { GetLobbysService } from './services/Lobby/GetLobbysService';
import { LobbysRepository } from './repositories/LobbysRepository';

const getLobbysService = new GetLobbysService();
const getLobbyByIdService = new GetLobbyByIdService();

io.on('connection', async (socket) => {
  const lobbyRepository = await getCustomRepository(LobbysRepository);

  socket.on('joinLobbys', async () => {
    const lobbys = await getLobbysService.execute();
    socket.join('lobbysRoom');
    socket.emit('allLobbys', lobbys);
  });

  socket.on('joinLobby', async (data) => {
    socket.join(`lobby_${data.id}`);
    const lobby = await getLobbyByIdService.execute({ id: data.id });
    socket.emit('lobby', lobby);
  });

  /// /

  socket.on('readyStart', async (data) => {
    io.to(`lobby_${data.id}`).emit('readyStarted');
    setTimeout(async () => {
      const readyLobby = await getLobbyByIdService.execute({ id: data.id });
      const allPlayers = [...readyLobby.team, ...readyLobby.enemy_team];

      if (readyLobby.ready.length !== allPlayers.length) {
        const lobbyAfterReady = { ...readyLobby, ready: [], status: 0 };

        const isTheCreatorReady = readyLobby.ready.find(
          (player) => player.id === readyLobby.creator.id,
        );

        if (!isTheCreatorReady) {
          await lobbyRepository.remove(readyLobby);

          io.to(`lobby_${data.id}`).emit('lobbyDeleted');
        } else {
          allPlayers.map(async (player) => {
            const isPlayerReady = readyLobby.ready.find((ready) => ready.id === player.id);
            const playerTeam = readyLobby.team.find((team) => team.id === player.id) ? 'team' : 'enemy_team';

            if (!isPlayerReady) {
              if (playerTeam === 'team') {
                lobbyAfterReady.team = lobbyAfterReady.team.filter((team) => team.id !== player.id);
              } else {
                lobbyAfterReady.enemy_team = lobbyAfterReady.enemy_team.filter(
                  (team) => team.id !== player.id,
                );
              }
            }
          });

          await lobbyRepository.save(lobbyAfterReady);

          io.to(`lobby_${data.id}`).emit('lobby', lobbyAfterReady);
        }
      }
    }, 10000);
  });
});
