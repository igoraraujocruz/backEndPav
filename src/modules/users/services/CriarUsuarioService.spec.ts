import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import CriarUsuarioService from './CriarUsuarioService';
import AppError from '@shared/erros/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CriarUsuário', () => {
	it('shoud be able to create a new user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();
		const createUser = new CriarUsuarioService(fakeUsersRepository, fakeHashProvider);

		const user = await createUser.execute({
			nome: 'NomeQualquer',
			password: '12345',
		});
		
		expect(user).toHaveProperty('id');
	});

	it('should not be able to create two users with the same name', async () => {
	  const fakeUsersRepository = new FakeUsersRepository();
	  const fakeHashProvider = new FakeHashProvider(); 
	  const createUser = new CriarUsuarioService(
		fakeUsersRepository,
		fakeHashProvider
	  );
  
	  await createUser.execute({
		nome: 'NomeIgual',
		password: '12345',
	});
  
	  expect(
		createUser.execute({
			nome: 'NomeIgual',
			password: '12345',
		}),
	  ).rejects.toBeInstanceOf(AppError);
	});
  });