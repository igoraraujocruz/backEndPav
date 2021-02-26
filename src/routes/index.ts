import { Router } from 'express';
import solicitacoesRouter from './solicitacoes.routes';
import usuariosRouter from './usuarios.routes';
import sessionsRouter from './sessions.routes';


const routes = Router();

routes.use('/solicitacao', solicitacoesRouter);
routes.use('/usuario', usuariosRouter);
routes.use('/sessions', sessionsRouter);

export default routes;