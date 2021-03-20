import { Router } from 'express';
import solicitacoesRouter from '@modules/orders/infra/http/routes/solicitacoes.routes';
import usuariosRouter from '@modules/users/infra/http/routes/usuarios.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';


const routes = Router();

routes.use('/solicitacao', solicitacoesRouter);
routes.use('/usuario', usuariosRouter);
routes.use('/sessions', sessionsRouter);

export default routes;