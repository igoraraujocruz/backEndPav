import Solicitacao from '../models/Solicitacao';
import { EntityRepository, Repository } from 'typeorm'; 

@EntityRepository(Solicitacao)
class SolicitacaoRepository extends Repository<Solicitacao> {}

export default SolicitacaoRepository;