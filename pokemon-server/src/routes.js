import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import PokemonController from './app/controllers/PokemonController';
import TypeController from './app/controllers/TypeController';

import authMiddleware from './app/middlewares/auth';
import adminMiddleware from './app/middlewares/admin';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.use(adminMiddleware);

routes.get('/types', TypeController.index);
routes.post('/types', TypeController.store);
routes.put('/types/:id', TypeController.update);
routes.delete('/types/:id', TypeController.delete);

routes.get('/pokemons', PokemonController.index);
routes.get('/pokemons/:pokedex', PokemonController.show);
routes.post('/pokemons', PokemonController.store);
routes.put('/pokemons/:pokedex', PokemonController.update);
routes.delete('/pokemons/:pokedex', PokemonController.delete);

export default routes;
