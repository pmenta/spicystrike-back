import { Router } from "express";

const router = Router();

import { CreateUserController } from "./controllers/CreateUserController";
import { UpdateUserController } from "./controllers/UpdateUserController";
import { AuthenticationController } from "./controllers/AuthenticationController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import { GetUsersController } from "./controllers/GetUsersController";
import { GetUserByIdController } from "./controllers/GetUserByIdController";

const authenticationController = new AuthenticationController();
const getUsersController = new GetUsersController();
const getUserByIdController = new GetUserByIdController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

router.post("/login", authenticationController.handle);

router.get("/users", getUsersController.handle);
router.get("/users/:id", getUserByIdController.handle);
router.post("/users", createUserController.handle);
router.put("/users", updateUserController.handle);
router.delete("/users", deleteUserController.handle);

export { router };
