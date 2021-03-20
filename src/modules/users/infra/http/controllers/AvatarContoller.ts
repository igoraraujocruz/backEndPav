import { Request, Response } from 'express';
import { container } from 'tsyringe'
import AtualizarAvatarDoUsuarioService from '@modules/users/services/AtualizarUsuarioAvatarService';

export default class AvatarController {
	public async update(request: Request, response: Response): Promise<Response> {
        const atualizarAvatarDoUsuario = container.resolve(AtualizarAvatarDoUsuarioService);
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
	}	
}