import Usuario from '../models/Usuario';
import { EntityRepository, Repository } from 'typeorm'; 

@EntityRepository(Usuario)
class UsuariosRepository extends Repository<Usuario> {}

export default UsuariosRepository;