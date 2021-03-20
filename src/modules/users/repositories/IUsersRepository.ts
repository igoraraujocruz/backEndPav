import Usuario from '@modules/users/infra/typeorm/entities/Usuario';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
    findById(id: string): Promise<Usuario | undefined>;
    findByName(nome: string): Promise<Usuario | undefined>;
    create(data: ICreateUserDTO): Promise<Usuario>;
    save(user: Usuario): Promise<Usuario>;
};