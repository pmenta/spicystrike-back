import { EntityRepository, Repository } from 'typeorm';
import { Team } from '../entities/Team';

@EntityRepository(Team)
class TeamsRepository extends Repository<Team> {}

export { TeamsRepository };
