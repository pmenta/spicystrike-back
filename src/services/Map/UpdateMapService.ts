import { getCustomRepository } from 'typeorm';
import { MapsRepository } from '../../repositories/MapsRepository';

interface IUpdateMapRequest {
  id: string;
  name: string;
}

class UpdateMapService {
  async execute({
    name, id,
  }: IUpdateMapRequest) {
    const mapRepository = await getCustomRepository(MapsRepository);

    let map = await mapRepository.findOne(id);

    if (!map) {
      throw new Error('Usuário não encontrado');
    }

    map = {
      id: map.id,
      name: name || map.name,
      created_at: map.created_at,
      updated_at: map.updated_at,
    };

    await mapRepository.save(map);

    return map;
  }
}

export { UpdateMapService };
