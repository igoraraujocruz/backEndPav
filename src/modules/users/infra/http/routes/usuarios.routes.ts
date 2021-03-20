import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import AvatarController from '../controllers/AvatarContoller';


const usuariosRouter = Router();
const usersControllers = new UsersController;
const avatarController = new AvatarController;
const upload = multer(uploadConfig)

usuariosRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), avatarController.update);

usuariosRouter.post('/' , (usersControllers.create));

/*
usuariosRouter.get('/', async (request, response) => {
    const buscarUsuarios = await usuarios.find();
    return response.json(buscarUsuarios);
});
*/



export default usuariosRouter;