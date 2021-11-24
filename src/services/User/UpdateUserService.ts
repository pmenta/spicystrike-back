import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../../repositories/UsersRepository';
import { TeamsRepository } from '../../repositories/TeamsRepository';
import { validateEmail } from '../../utils/validateEmail';
import { Team } from '../../entities/Team';

interface IUpdateUserRequest {
  id: string;
  name?: string;
  password?: string;
  email?: string;
  team_id?: string;
}

class UpdateUserService {
  async execute({
    name, password, email, id, team_id,
  }: IUpdateUserRequest) {
    const userRepository = await getCustomRepository(UsersRepository);
    const teamRepository = await getCustomRepository(TeamsRepository);

    let team: Team;

    let user = await userRepository.findOne(id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (team_id) {
      team = await teamRepository.findOne(team_id);

      if (!team) {
        throw new Error('Time não encontrado');
      }

      const players = await userRepository.find({ where: { team_id } });
      if (players.length >= 5) {
        throw new Error('Este time já está cheio');
      }
    }

    if (email) {
      const emailIsValid = validateEmail(email);

      if (!emailIsValid) {
        throw new Error('Invalid e-mail');
      }
    }

    if (password) {
      const decryptedPassword = await hash(password, 8);

      user = {
        id: user.id,
        name: name || user.name,
        email: email || user.email,
        password: password ? decryptedPassword : password,
        team_id: team_id || user.team_id,
        created_at: user.created_at,
        updated_at: user.updated_at,
        team: user.team || team,
      };

      await userRepository.save(user);
      return user;
    }

    user = {
      id: user.id,
      name: name || user.name,
      email: email || user.email,
      password: user.password,
      team_id: team_id || user.team_id,
      created_at: user.created_at,
      updated_at: user.updated_at,
      team: user.team || team,
    };

    await userRepository.save(user);

    return user;
  }
}

export { UpdateUserService };
