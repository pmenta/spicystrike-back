import { getCustomRepository } from 'typeorm';
import { ServersRepository } from '@/repositories/ServersRepository';

class GetServersService {
  async execute() {
    const serversRepository = await getCustomRepository(ServersRepository);

    const servers = await serversRepository.find();

    return servers;
  }
}

export { GetServersService };
