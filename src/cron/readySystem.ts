import { getCustomRepository } from 'typeorm';
import cron from 'node-cron';
import { addSeconds } from 'date-fns';
import { LobbysRepository } from '../repositories/LobbysRepository';
import { io } from '../http';

export class ReadyCron {
  async execute({ lobby_id }: { lobby_id: string }) {
    const now = new Date();
    const in30s = addSeconds(now, 10);
    const cronExpression = `${in30s.getSeconds()} ${in30s.getMinutes()} ${in30s.getHours()} ${in30s.getDate()} ${in30s.getMonth()} *`;

    const task = cron.schedule(cronExpression, async () => {
      console.log('running a task in 10s');
      const lobbyRepository = await getCustomRepository(LobbysRepository);
      const readyLobby = await lobbyRepository.findOne({ where: { id: lobby_id }, relations: ['creator'] });
      if (readyLobby.ready.length !== 2) {
        await lobbyRepository.save({ ...readyLobby, ready: [], status: 0 });

        io.to(`lobby_${lobby_id}`).emit('lobby', { ...readyLobby, ready: [], status: 0 });
      }
      task.stop();
    });
  }
}
