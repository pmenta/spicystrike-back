import { Router } from "express";

const router = Router();

import { CreateUserController } from "./controllers/CreateUserController";
import { UpdateUserController } from "./controllers/UpdateUserController";
import { AuthenticationController } from "./controllers/AuthenticationController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { DeleteUserController } from "./controllers/DeleteUserController";
import { GetUsersController } from "./controllers/GetUsersController";

const authenticationController = new AuthenticationController();
const getUsersController = new GetUsersController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

router.post("/login", authenticationController.handle);

router.get("/users", ensureAuthenticated, getUsersController.handle);
router.post("/users", createUserController.handle);
router.put("/users", ensureAuthenticated, updateUserController.handle);
router.delete("/users", ensureAuthenticated, deleteUserController.handle);

export { router };
