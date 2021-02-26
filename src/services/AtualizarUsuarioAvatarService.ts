import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Usuario from '../models/Usuario';
import uploadConfig from '../config/upload';
import AppError from '../erros/AppError';

interface RequestDTO {
    user_id: string;
    avatarFilename: string;
};

class AtualizarAvatarDoUsuarioService {
    public async execute({user_id, avatarFilename}: RequestDTO): Promise<Usuario> {
        const usuariosRepositorio = getRepository(Usuario);
        const usuario = await usuariosRepositorio.findOne(user_id);

        if(!usuario) {
            throw new AppError ('Apenas usuários autenticados podem mudar o avatar', 401);
        }

        if(usuario.avatar) {
            const avatarDoUsuarioFilePath = path.join(uploadConfig.directory, usuario.avatar);
            try {
                await fs.promises.stat(avatarDoUsuarioFilePath);

                await fs.promises.unlink(avatarDoUsuarioFilePath);
            } catch (error) {
                console.log(error)
            }
        }

        usuario.avatar = avatarFilename;
        await usuariosRepositorio.save(usuario);

        return usuario;
    }
}

export default AtualizarAvatarDoUsuarioService;