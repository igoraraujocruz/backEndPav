import path from 'path';
import fs from 'fs';
import Usuario from '@modules/users/infra/typeorm/entities/Usuario';
import uploadConfig from '@config/upload';
import AppError from '@shared/erros/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequestDTO {
    user_id: string;
    avatarFilename: string;
};

@injectable()
class AtualizarAvatarDoUsuarioService {
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepositorio: IUsersRepository,
        
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
        ) {}

    public async execute({user_id, avatarFilename}: IRequestDTO): Promise<Usuario> {
        
        const usuario = await this.usuariosRepositorio.findById(user_id);

        if(!usuario) {
            throw new AppError ('Apenas usuários autenticados podem mudar o avatar', 401);
        }

        if(usuario.avatar) {
            await this.storageProvider.deleteFile(usuario.avatar);
         }
             
        const filename = await this.storageProvider.saveFile(avatarFilename);
 

        usuario.avatar = filename;
        await this.usuariosRepositorio.save(usuario);

        return usuario;
    }
}

export default AtualizarAvatarDoUsuarioService;