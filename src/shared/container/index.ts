import { container } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsuariosRepository from '@modules/users/infra/typeorm/repositories/UsuariosRepository';
import '@modules/users/providers';
import './providers';

container.registerSingleton<IUsersRepository>('UsuariosRepository', UsuariosRepository)
