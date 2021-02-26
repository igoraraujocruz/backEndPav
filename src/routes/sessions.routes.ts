import { Router } from 'express';

import AutenticarUsuarioService from '../services/AutenticarUsuarioService';

const sessionsRouter = Router();

sessionsRouter.post('/' , async (request, response) => {

	const { nome, password } = request.body
	
	const authenticateUser = new AutenticarUsuarioService();

	const { user, token } = await authenticateUser.execute({
		nome,
		password,
	})

	delete user.password;
	
	return response.json({user, token})

});

export default sessionsRouter;