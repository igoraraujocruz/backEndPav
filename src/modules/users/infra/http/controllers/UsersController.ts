import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CriarUsuarioService from '@modules/users/services/CriarUsuarioService';


export default class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
        
        const { nome, password } = request.body
        const criarProduto = container.resolve(CriarUsuarioService);
        const usuario = await criarProduto.execute({ nome, password });
    
        const userWithoutPassword = {
            id: usuario.id,
            nome: usuario.nome,
            create_at: usuario.create_at,
            updated_at: usuario.updated_at,
        };
    
        return response.json(userWithoutPassword)

    }
}