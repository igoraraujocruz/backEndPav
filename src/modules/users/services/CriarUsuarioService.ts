import Usuario from '@modules/users/infra/typeorm/entities/Usuario';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/erros/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
    nome: string;
    password: string;
}

@injectable()
class CriarUsuarioService {

    constructor(
        @inject('UsuariosRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ nome, password }: IRequestDTO): Promise<Usuario> {
        
        const checkUserExists = await this.usersRepository.findByName(nome);

        if(checkUserExists) {
            throw new AppError('This user already exist.');
        }

        const hashedPassword = await this.hashProvider.generateHash(password)

        const createUser = await this.usersRepository.create({
            nome,
            password: hashedPassword,
        });

    return createUser;

    }  
}

export default CriarUsuarioService;