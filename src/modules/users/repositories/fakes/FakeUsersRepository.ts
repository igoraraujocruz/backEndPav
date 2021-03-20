import Usuario from '@modules/users/infra/typeorm/entities/Usuario';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { v4 as uuid } from 'uuid';

export default class FakeUsersRepository implements IUsersRepository {
    
    private users: Usuario[] = [];

    public async findById(id: string): Promise<Usuario | undefined> {
        const findId = this.users.find(
            user => user.id == id,
        );

        return findId
    }

    public async findByName(nome: string): Promise<Usuario | undefined> {
        const findName = this.users.find(
            user => user.nome === nome,
        );
        return findName;    
    }

    public async create({ nome, password }: ICreateUserDTO): Promise<Usuario> {
        const user = new Usuario();
        Object.assign(user, {id: uuid(), nome, password});

        this.users.push(user);
        return user;
    }

    public async save(user: Usuario): Promise<Usuario> {
        const findIndex = this.users.findIndex(findUser => findUser.id == user.id);
        this.users[findIndex] = user;
        return user;
    } 
}