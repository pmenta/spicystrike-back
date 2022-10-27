import { getCustomRepository } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { LobbysRepository } from '../../repositories/LobbysRepository';
import { MapsRepository } from '../../repositories/MapsRepository';
import { OpenServerService } from '../Server/OpenServerService';

interface IVetoMapRequest {
  map_id: string;
  lobby_id: string;
}

class VetoMapService {
  async execute({ map_id, lobby_id }: IVetoMapRequest) {
    const lobbyRepository = await getCustomRepository(LobbysRepository);
    const mapsRepository = await getCustomRepository(MapsRepository);

    if (!map_id) {
      throw new Error('O ID do usuário não foi informado');
    }

    if (!lobby_id) {
      throw new Error('O ID do lobby não foi informado');
    }

    const lobby = await lobbyRepository.findOne(lobby_id, {
      relations: ['creator'],
    });

    if (!lobby) {
      throw new Error('Lobby não encontrado');
    }

    if (lobby.map) {
      throw new Error('Mapa já selecionado');
    }

    const map = await mapsRepository.findOne(map_id);
    const allMaps = await mapsRepository.find();

    if (!map) {
      throw new Error('Mapa não existe');
    }

    const newLobby = {
      ...lobby,
      vetoes: [...lobby.vetoes, map.id],
    };

    if (newLobby.vetoes.length === allMaps.length - 1) {
      const openServerService = new OpenServerService();
      const mapId = allMaps.find((_map) => !newLobby.vetoes.includes(_map.id));
      const server = await openServerService.execute({ map_id });

      const mapDecided = {
        ...newLobby,
        map: mapId.id,
        status: 3,
        server,
      };

      await lobbyRepository.save(mapDecided);
      return classToPlain(mapDecided);
    }

    await lobbyRepository.save(newLobby);
    return classToPlain(newLobby);
  }
}

export { VetoMapService };
