import { EntityRepository, Repository } from 'typeorm';
import { Lobby } from '../entities/Lobby';

@EntityRepository(Lobby)
class LobbysRepository extends Repository<Lobby> {}

export { LobbysRepository };
