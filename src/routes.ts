import { Router } from 'express';

// Rotas de User
import { CreateUserController } from './controllers/User/CreateUserController';
import { UpdateUserController } from './controllers/User/UpdateUserController';
import { AuthenticationController } from './controllers/Auth/AuthenticationController';
import { DeleteUserController } from './controllers/User/DeleteUserController';
import { GetUsersController } from './controllers/User/GetUsersController';
import { GetUserByIdController } from './controllers/User/GetUserByIdController';

// Rotas de Team
import { CreateTeamController } from './controllers/Team/CreateTeamController';
import { GetTeamsController } from './controllers/Team/GetTeamsController';
import { UpdateTeamController } from './controllers/Team/UpdateTeamController';
import { GetTeamByIdController } from './controllers/Team/GetTeamByIdController';
import { DeleteTeamController } from './controllers/Team/DeleteTeamController';

import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const router = Router();

const authenticationController = new AuthenticationController();
const getUsersController = new GetUsersController();
const getUserByIdController = new GetUserByIdController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

const createTeamController = new CreateTeamController();
const getTeamsController = new GetTeamsController();
const updateTeamController = new UpdateTeamController();
const getTeamByIdController = new GetTeamByIdController();
const deleteTeamController = new DeleteTeamController();

router.post('/login', authenticationController.handle);

router.get('/users', ensureAuthenticated, getUsersController.handle);
router.get('/users/:id', ensureAuthenticated, getUserByIdController.handle);
router.post('/users', createUserController.handle);
router.put('/users', ensureAuthenticated, updateUserController.handle);
router.delete('/users', ensureAuthenticated, deleteUserController.handle);

router.get('/teams', ensureAuthenticated, getTeamsController.handle);
router.post('/teams', ensureAuthenticated, createTeamController.handle);
router.put('/teams', ensureAuthenticated, updateTeamController.handle);
router.get('/teams/:id', ensureAuthenticated, getTeamByIdController.handle);
router.delete('/teams', ensureAuthenticated, deleteTeamController.handle);

export { router };
