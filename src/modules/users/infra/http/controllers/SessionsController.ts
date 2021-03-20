import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AutenticarUsuarioService from '@modules/users/services/AutenticarUsuarioService';

export default class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
        
        const { nome, password } = request.body
	
	    const authenticateUser = container.resolve(AutenticarUsuarioService);

	    const { user, token } = await authenticateUser.execute({
		    nome,
		    password,
	    })

	    const userWithoutPassword = {
            id: user.id,
            name: user.nome,
            created_at: user.create_at,
            updated_at: user.updated_at,
        };
	
	    return response.json({user: userWithoutPassword, token})


    }
}