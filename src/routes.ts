import { Router } from 'express';

// Rota de Autenticação

import { AuthenticationController } from './controllers/Auth/AuthenticationController';

import { CreateUserController } from './controllers/User/CreateUserController';
import { UpdateUserController } from './controllers/User/UpdateUserController';
import { DeleteUserController } from './controllers/User/DeleteUserController';
import { GetUsersController } from './controllers/User/GetUsersController';
import { GetUserByIdController } from './controllers/User/GetUserByIdController';

import { CreateMapController } from './controllers/Map/CreateMapController';
import { UpdateMapController } from './controllers/Map/UpdateMapController';
import { DeleteMapController } from './controllers/Map/DeleteMapController';
import { GetMapsController } from './controllers/Map/GetMapsController';

import { GetLobbysController } from './controllers/Lobby/GetLobbyController';
import { CreateLobbyController } from './controllers/Lobby/CreateLobbyController';
import { GetLobbyByIdController } from './controllers/Lobby/GetLobbyByIdController';
import { EnterInX1LobbyController } from './controllers/Lobby/EnterX1LobbyController';
import { GetReadyController } from './controllers/Lobby/GetReadyController';

import { VetoMapController } from './controllers/Vetoes/VetoMapController';

import { GetServersController } from './controllers/Servers/GetServersController';
import { CreateServerController } from './controllers/Servers/CreateServerController';
import { OpenServerController } from './controllers/Servers/OpenServerController';

import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const router = Router();

const authenticationController = new AuthenticationController();

const getUsersController = new GetUsersController();
const getUserByIdController = new GetUserByIdController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

const getMapsController = new GetMapsController();
const createMapController = new CreateMapController();
const updateMapController = new UpdateMapController();
const deleteMapController = new DeleteMapController();

const getLobbysController = new GetLobbysController();
const createLobbyController = new CreateLobbyController();
const getLobbyByIdController = new GetLobbyByIdController();
const enterInX1LobbyController = new EnterInX1LobbyController();
const getReadyController = new GetReadyController();

const vetoMapController = new VetoMapController();

const getServersController = new GetServersController();
const createServerController = new CreateServerController();
const openServerController = new OpenServerController();

router.post('/login', authenticationController.handle);

router.get('/users', ensureAuthenticated, getUsersController.handle);
router.get('/users/:id', ensureAuthenticated, getUserByIdController.handle);
router.post('/users', createUserController.handle);
router.put('/users', ensureAuthenticated, updateUserController.handle);
router.delete('/users', ensureAuthenticated, deleteUserController.handle);

router.get('/maps', ensureAuthenticated, getMapsController.handle);
router.post('/maps', ensureAuthenticated, createMapController.handle);
router.put('/maps/:id', ensureAuthenticated, updateMapController.handle);
router.delete('/maps', ensureAuthenticated, deleteMapController.handle);

router.get('/lobbys', ensureAuthenticated, getLobbysController.handle);
router.get('/lobbys/:id', ensureAuthenticated, getLobbyByIdController.handle);
router.post('/lobbys', ensureAuthenticated, createLobbyController.handle);
router.post('/lobbys/:id', ensureAuthenticated, enterInX1LobbyController.handle);
router.post('/lobbys/ready/:id', ensureAuthenticated, getReadyController.handle);
router.post('/lobbys/veto/:id', ensureAuthenticated, vetoMapController.handle);

router.post('/servers', ensureAuthenticated, createServerController.handle);
router.get('/servers', ensureAuthenticated, getServersController.handle);
router.post('/servers/open', ensureAuthenticated, openServerController.handle);

export { router };
