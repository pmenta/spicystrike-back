import { classToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { TeamsRepository } from '../../repositories/TeamsRepository';
import { UsersRepository } from '../../repositories/UsersRepository';

interface IGetTeamByIdRequest {
  id: string;
}

class GetTeamByIdService {
  async execute({ id }:IGetTeamByIdRequest) {
    const teamsRepository = await getCustomRepository(TeamsRepository);
    const usersRepository = await getCustomRepository(UsersRepository);

    const team = await teamsRepository.findOne({ where: { id }, relations: ['founder'] });
    delete team.founder.password;
    delete team.founder.email;
    delete team.founder.team_id;

    const players = await usersRepository.find({ where: { team_id: id } });
    players.map((player) => delete player.team_id);
    const playersToPlain = classToPlain(players);

    return { ...team, players: playersToPlain };
  }
}

export { GetTeamByIdService };
