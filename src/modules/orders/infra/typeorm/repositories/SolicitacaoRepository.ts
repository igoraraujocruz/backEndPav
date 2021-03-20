import Solicitacao from '@modules/orders/infra/typeorm/entities/Solicitacao';
import { EntityRepository, Repository } from 'typeorm'; 

@EntityRepository(Solicitacao)
class SolicitacaoRepository extends Repository<Solicitacao> {}

export default SolicitacaoRepository;