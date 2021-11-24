import { getCustomRepository } from 'typeorm';
import { TeamsRepository } from '../../repositories/TeamsRepository';
// import { UsersRepository } from '../../repositories/UsersRepository';

class GetTeamsService {
  async execute() {
    const teamsRepository = await getCustomRepository(TeamsRepository);
    // const usersRepository = await getCustomRepository(UsersRepository);

    const teams = await teamsRepository.find({ relations: ['founder'] });
    teams.filter((team) => {
      delete team.founder.password;
      delete team.founder.email;
      delete team.founder.team_id;
    });
    // teams.map(async (team) => {
    //   const players = await usersRepository.find({ where: team.id });
    //   team = { ...team, players };
    // });

    return teams;
  }
}

export { GetTeamsService };
