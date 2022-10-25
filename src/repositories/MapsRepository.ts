import { EntityRepository, Repository } from 'typeorm';
import { Map } from '../entities/Map';

@EntityRepository(Map)
class MapsRepository extends Repository<Map> {}

export { MapsRepository };
