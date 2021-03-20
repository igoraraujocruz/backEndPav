import Usuario from '@modules/users/infra/typeorm/entities/Usuario';
import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth';
import AppError from '@shared/erros/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
	nome: string;
	password: string;
}

interface IResponseDTO {
	user: Usuario;
	token: string;
}

@injectable()
class AutenticarUsuarioService {
	constructor (
		@inject('UsuariosRepository')
		private usersRepository: IUsersRepository,
		
		@inject('HashProvider')
		private hashProvider: IHashProvider,

		) {}

	public async execute({ nome, password }: IRequestDTO): Promise<IResponseDTO> {
		
		const user = await this.usersRepository.findByName(nome);

		if (!user) {
			throw new AppError('O nome/ou senha estão incorretos.', 401);
		};

		const passwordMatched = await this.hashProvider.compareHash(password, user.password);
		
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