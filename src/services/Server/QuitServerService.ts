import { getCustomRepository } from 'typeorm';
import { NodeSSH } from 'node-ssh';
import { ServersRepository } from '../../repositories/ServersRepository';

interface IOpenServerRequest {
  id: string
}

class OpenServerService {
  async execute({ id }: IOpenServerRequest) {
    const ssh = new NodeSSH();
    const serversRepository = await getCustomRepository(ServersRepository);

    const server = await serversRepository.findOne(id);

    if (!server) {
      throw new Error('Server não encontrado');
    }

    await ssh.connect({
      host: server.hostname,
      username: 'ubuntu',
      privateKeyPath: 'src/keys/spicystrike.pem',
    });

    await ssh.execCommand('./quit.sh');

    const serverUpdated = {
      ...server,
      status: 0,
    };

    await serversRepository.save(serverUpdated);

    return true;
  }
}

export { OpenServerService };
