import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import AuthenticateUserService from './AutenticarUsuarioService';
import AppError from '@shared/erros/AppError';
import CriarUsuarioService from './CriarUsuarioService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateUser', () => {
	it('shoud be able to authenticate', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();
        const createUser = new CriarUsuarioService(fakeUsersRepository, fakeHashProvider)
		const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
	
		const user = await createUser.execute({
			nome: 'Fulano',
			password: '12345', 
		})		

		const response = await authenticateUser.execute({
			nome: 'Fulano',
			password: '12345',
		});
		
		expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user)
	});

    it('should not be able to authenticate with non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        
        const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
        
        expect(authenticateUser.execute({
            nome: 'Fulano',
            password: '12345',
        }),
        ).rejects.toBeInstanceOf(AppError);

    });
    
    it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CriarUsuarioService(fakeUsersRepository, fakeHashProvider)
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    await createUser.execute({
        nome: 'Fulano',
        password: '12345', 
    })		
    
    expect(authenticateUser.execute({
        nome: 'Fulano',
        password: 'wrong-password',
        }),
    ).rejects.toBeInstanceOf(AppError);
    });
});