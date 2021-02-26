import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import Usuario from '../models/Usuario';
import { sign } from 'jsonwebtoken'
import authConfig from '../config/auth';
import AppError from '../erros/AppError';


interface RequestDTO {
	nome: string;
	password: string;
}

interface Response {
	user: Usuario;
	token: string;
}

class AutenticarUsuarioService {
	public async execute({ nome, password }: RequestDTO): Promise<Response> {
		const usersRepository = getRepository(Usuario);
		
		const user = await usersRepository.findOne({
			where: { nome }
		});

		if (!user) {
			throw new AppError('O nome/ou senha estão incorretos.', 401);
		};

		const passwordMatched = await compare(password, user.password);
		
		if (!passwordMatched) {
			throw new AppError('O nome/ou senha estão incorretos.', 401);
		};

		const { secret, expiresIn } = authConfig.jwt;

		const token = sign({}, secret, {
			subject: user.id,
			expiresIn: expiresIn
		})

		return {
			user,
			token,
		};
	}
}

export default AutenticarUsuarioService;