import { EntityRepository, Repository } from 'typeorm';
import { Server } from '../entities/Server';

@EntityRepository(Server)
class ServersRepository extends Repository<Server> {}

export { ServersRepository };
