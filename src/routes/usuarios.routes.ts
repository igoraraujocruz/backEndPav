import { Router } from 'express';
import UsuariosRepository from '../repositories/UsuariosRepository';
import CriarUsuarioService from '../services/CriarUsuarioService';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import AtualizarAvatarDoUsuarioService from '../services/AtualizarUsuarioAvatarService';


const usuariosRouter = Router();
const upload = multer(uploadConfig)

usuariosRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async(request, response) => {
    console.log(request.file)

    const atualizarAvatarDoUsuario = new AtualizarAvatarDoUsuarioService();
    const usuario = await atualizarAvatarDoUsuario.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename
    });
    
    const usuarioSemSenha = {
        id: usuario.id,
        nome: usuario.nome,
        create_at: usuario.create_at,
        updated_at: usuario.updated_at,
        avatar: usuario.avatar
        };	
        
    return response.json(usuarioSemSenha);

});

usuariosRouter.post('/' , async (request, response) => {

    const { nome, password } = request.body
    const criarProduto = new CriarUsuarioService();
    const usuario = await criarProduto.execute({ nome, password });
    
    const userWithoutPassword = {
        id: usuario.id,
        nome: usuario.nome,
        create_at: usuario.create_at,
        updated_at: usuario.updated_at,
        };
    
    return response.json(userWithoutPassword)

});

usuariosRouter.get('/', async (request, response) => {
    const usuarios = getCustomRepository(UsuariosRepository);
    const buscarUsuarios = await usuarios.find();


    return response.json(buscarUsuarios);
});



export default usuariosRouter;