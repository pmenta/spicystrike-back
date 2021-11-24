import { getCustomRepository } from 'typeorm';
import { TeamsRepository } from '../../repositories/TeamsRepository';

interface IDeleteTeamRequest {
  id: string;
  user_id: string;
}

class DeleteTeamService {
  async execute({ id, user_id }:IDeleteTeamRequest) {
    const teamRepository = await getCustomRepository(TeamsRepository);

    if (!id) {
      throw new Error('ID is required');
    }

    const team = await teamRepository.findOne(id);

    if (!team) {
      throw new Error('Team does not exists');
    }

    if (team.founder_id !== user_id) {
      throw new Error('Você não tem permissão para isso.');
    }

    await teamRepository.remove(team);

    return true;
  }
}

export { DeleteTeamService };
