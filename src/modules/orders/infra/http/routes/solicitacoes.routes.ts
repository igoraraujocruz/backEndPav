import { Router } from 'express';
import ComprasRepository from '@modules/orders/infra/typeorm/repositories/SolicitacaoRepository';
import CriarSolicitacaoService from '@modules/orders/services/CriarSolicitacaoService';
import { getCustomRepository } from 'typeorm';
//import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

const solicitacoesRouter = Router();

//solicitacoesRouter.use(ensureAuthenticated);

solicitacoesRouter.post('/' , async (request, response) => {
    
    const { nome, atendimento, carteira, tipo, solicitante } = request.body
    const criarSolicitacao = new CriarSolicitacaoService();
    const solicitacao = await criarSolicitacao.execute({ nome, atendimento, carteira, tipo, solicitante });
    return response.json(solicitacao)

});

solicitacoesRouter.get('/', async (request, response) => {
    const produtos = getCustomRepository(ComprasRepository);
    const buscarProdutos = await produtos.find();
    return response.json(buscarProdutos);
});

export default solicitacoesRouter;