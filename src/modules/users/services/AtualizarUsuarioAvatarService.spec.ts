import AppError from '@shared/erros/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AtualizarAvatarDoUsuarioService from './AtualizarUsuarioAvatarService';

describe('UpdateUserAvatar', () => {
	it('should be able to att avatar user', async () => {
		const fakeUsersRepository =  new FakeUsersRepository();
		const fakeStorageProvider = new FakeStorageProvider();
	
		const updateUserAvatar = new AtualizarAvatarDoUsuarioService(
			fakeUsersRepository,
			fakeStorageProvider,
		);
		
		const user = await fakeUsersRepository.create({
			nome: 'Fulado',
			password: '12345',
		});
			
		await updateUserAvatar.execute({
			user_id: user.id,
			avatarFilename: 'avatar.jpg',
		});
		
		expect(user.avatar).toBe('avatar.jpg');
	})
    
    it('should not be able to update avatar from non existing user', async () => {
		const fakeUsersRepository =  new FakeUsersRepository();
		const fakeStorageProvider = new FakeStorageProvider();
	
		const updateUserAvatar = new AtualizarAvatarDoUsuarioService(
			fakeUsersRepository,
			fakeStorageProvider,
		);
		
		expect(updateUserAvatar.execute({
			user_id: 'non-existing-user',
			avatarFilename: 'avatar.jpg',
		})).rejects.toBeInstanceOf(AppError);
	})

    it('should delete old avatar when updating new one', async () => {
		const fakeUsersRepository =  new FakeUsersRepository();
		const fakeStorageProvider = new FakeStorageProvider();
		const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
			
		const updateUserAvatar = new AtualizarAvatarDoUsuarioService(
			fakeUsersRepository,
			fakeStorageProvider,
		);
		
		const user = await fakeUsersRepository.create({
			nome: 'Fulado',
			password: '12345',
		});
			
		await updateUserAvatar.execute({
			user_id: user.id,
			avatarFilename: 'avatar.jpg',
		});

		await updateUserAvatar.execute({
			user_id: user.id,
			avatarFilename: 'avatar2.jpg',
		});
		
		expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
		expect(user.avatar).toBe('avatar2.jpg');
	})
});