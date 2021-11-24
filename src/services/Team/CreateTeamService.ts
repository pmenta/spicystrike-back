import { getCustomRepository } from 'typeorm';
import { TeamsRepository } from '../../repositories/TeamsRepository';
import { UsersRepository } from '../../repositories/UsersRepository';

interface ICreateTeamRequest {
  name: string;
  founder_id: string;
}

class CreateTeamService {
  async execute({ name, founder_id }:ICreateTeamRequest) {
    const teamsRepository = getCustomRepository(TeamsRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    if (!name) {
      throw new Error('O nome é necessário');
    }

    const team = await teamsRepository.create({ name, founder_id });
    await teamsRepository.save(team);

    // Setando o time do fundador
    let founder = await usersRepository.findOne(founder_id);
    founder = { ...founder, team_id: team.id };
    await usersRepository.save(founder);

    return team;
  }
}

export { CreateTeamService };
