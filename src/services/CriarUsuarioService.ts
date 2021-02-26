import Usuario from '../models/Usuario';
import UsuariosRepository from '../repositories/UsuariosRepository';
import { getCustomRepository } from 'typeorm'
import { hash } from 'bcryptjs';

interface RequestDTO {
    nome: string;
    password: string;
}

class CriarUsuarioService {

    public async execute({ nome, password }: RequestDTO): Promise<Usuario> {
		const usersRepository = getCustomRepository(UsuariosRepository);
        
        const hashedPassword = await hash(password, 8)

        const createUser = usersRepository.create({
            nome,
            password: hashedPassword,
        });

        await usersRepository.save(createUser);
        return createUser;
    }
}

export default CriarUsuarioService;