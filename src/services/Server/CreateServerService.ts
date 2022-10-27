import { getCustomRepository } from 'typeorm';
import { ServersRepository } from '../../repositories/ServersRepository';

interface ICreateServerRequest {
  hostname: string;
  key_filename: string;
  ip: string;
  password: string;
}

class CreateServerService {
  async execute({
    hostname, key_filename, ip, password,
  }: ICreateServerRequest) {
    const serversRepository = await getCustomRepository(ServersRepository);
    const serverAlreadyExists = await serversRepository.findOne({ hostname });

    if (!hostname || !key_filename || !ip || !password) {
      throw new Error('Verifique os dados necessários');
    }

    if (serverAlreadyExists) {
      throw new Error('Este mapa já existe');
    }

    const server = serversRepository.create({
      hostname,
      key_filename,
      ip,
      password,
    });

    await serversRepository.save(server);

    return server;
  }
}

export { CreateServerService };
