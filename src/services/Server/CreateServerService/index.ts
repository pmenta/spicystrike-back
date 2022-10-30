import { getCustomRepository } from "typeorm";
import { ServersRepository } from "@/repositories/ServersRepository";
import { Server } from "@/entities/Server";
import { Either, left, right } from "@/errors/either";
import { RequiredParametersError } from "@/errors/requiredParametersError";

interface ICreateServerRequest {
  hostname: string;
  key_filename: string;
  ip: string;
  password: string;
}

type IResponse = Either<RequiredParametersError, Server>;

class CreateServerService {
  async execute({
    hostname,
    key_filename,
    ip,
    password,
  }: ICreateServerRequest): Promise<IResponse> {
    const serversRepository = await getCustomRepository(ServersRepository);
    const serverAlreadyExists = await serversRepository.findOne({ hostname });

    if (!hostname || !key_filename || !ip || !password) {
      return left(
        new RequiredParametersError("Verifique os dados necessários", 400)
      );
    }

    if (serverAlreadyExists) {
      return left(new RequiredParametersError("Servidor já cadastrado", 400));
    }

    const server = serversRepository.create({
      hostname,
      key_filename,
      ip,
      password,
    });

    await serversRepository.save(server);

    return right(server);
  }
}

export { CreateServerService };
