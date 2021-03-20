import Usuario from '@modules/users/infra/typeorm/entities/Usuario';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { getRepository, Repository } from 'typeorm'; 


class UsuariosRepository implements IUsersRepository {
    private ormRepository: Repository<Usuario>;

    constructor() {
        this.ormRepository = getRepository(Usuario);
    }

    public async findById(id: string): Promise<Usuario | undefined> {
        const findUser = await this.ormRepository.findOne(id);
        return findUser;
    }

    public async findByName(nome: string): Promise<Usuario | undefined> {
        const findUser = await this.ormRepository.findOne({ where: { nome }, });
        return findUser;
    }

    public async create({ nome, password }: ICreateUserDTO): Promise<Usuario> {
        const user = this.ormRepository.create({nome, password});
        await this.ormRepository.save(user);
        return user;
    }

    public async save(user: Usuario): Promise<Usuario> {
        return this.ormRepository.save(user);
    }
}

export default UsuariosRepository;