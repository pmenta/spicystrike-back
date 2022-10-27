import { getCustomRepository } from 'typeorm';
import { NodeSSH } from 'node-ssh';
import { ServersRepository } from '../../repositories/ServersRepository';
import { MapsRepository } from '../../repositories/MapsRepository';

interface IOpenServerRequest {
  map_id: string
}

class OpenServerService {
  async execute({ map_id }: IOpenServerRequest) {
    const ssh = new NodeSSH();
    const serversRepository = await getCustomRepository(ServersRepository);
    const mapsRepository = await getCustomRepository(MapsRepository);

    const server = await serversRepository.findOne({ where: { status: 0 } });

    if (!server) {
      throw new Error('Nenhum servidor está disponível no momento');
    }

    const map = await mapsRepository.findOne(map_id);

    await ssh.connect({
      host: server.hostname,
      username: 'ubuntu',
      privateKeyPath: 'src/keys/spicystrike.pem',
    });

    await ssh.execCommand(`./start_${map.name}.sh`).then((result) => {
      console.log(`STDOUT: ${result.stdout}`);
      console.log(`STDERR: ${result.stderr}`);
    });

    const serverUpdated = {
      ...server,
      status: 1,
    };

    await serversRepository.save(serverUpdated);

    return {
      ip: server.ip,
      password: server.password,
    };
  }
}

export { OpenServerService };
