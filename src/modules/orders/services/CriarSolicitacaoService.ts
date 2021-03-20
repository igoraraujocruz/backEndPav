import Solicitacao from '@modules/orders/infra/typeorm/entities/Solicitacao';
import SolicitacaoRepository from '@modules/orders/infra/typeorm/repositories/SolicitacaoRepository';
import { getCustomRepository } from 'typeorm'

interface RequestDTO {
    nome: string;
    atendimento: string;
    carteira: string;
    tipo: string;
    solicitante: string;
}

class CriarSolicitacaoService {

    public async execute({ nome, atendimento, carteira, tipo, solicitante }: RequestDTO): Promise<Solicitacao> {
		const solicitacaoRepository = getCustomRepository(SolicitacaoRepository);
        
        const solicitacao = solicitacaoRepository.create({
            nome,
            atendimento,
            carteira,
            tipo,
            solicitante
        });

        await solicitacaoRepository.save(solicitacao);
        return solicitacao;
    }
}

export default CriarSolicitacaoService;