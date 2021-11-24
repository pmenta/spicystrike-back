import { classToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { TeamsRepository } from '../../repositories/TeamsRepository';
import { UsersRepository } from '../../repositories/UsersRepository';

interface IUpdateTeamRequest {
  id: string;
  name: string;
}

class UpdateTeamService {
  async execute({ name, id }:IUpdateTeamRequest) {
    const teamsRepository = getCustomRepository(TeamsRepository);
    const usersRepository = await getCustomRepository(UsersRepository);

    if (!name) {
      throw new Error('O nome é necessário');
    }

    let team = await teamsRepository.findOne({ where: { id }, relations: ['founder'] });

    if (!team) {
      throw new Error('Time não encontrado');
    }

    delete team.founder.email;
    delete team.founder.password;

    team = {
      ...team,
      name,
    };

    const players = await usersRepository.find({ where: { team_id: id } });
    const playersToPlain = classToPlain(players);

    await teamsRepository.save(team);

    return { ...team, players: playersToPlain };
  }
}

export { UpdateTeamService };
