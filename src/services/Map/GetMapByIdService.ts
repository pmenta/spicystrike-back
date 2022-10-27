import { getCustomRepository } from 'typeorm';
import { MapsRepository } from '../../repositories/MapsRepository';

interface IGetMapByIdRequest {
  map_id: string;
}

class GetMapByIdService {
  async execute({ map_id }: IGetMapByIdRequest) {
    const mapsRepository = await getCustomRepository(MapsRepository);

    const map = await mapsRepository.findOne(map_id);

    return map;
  }
}

export { GetMapByIdService };
