import express from 'express';
import UserValidator from '../validator'
import Middleware from '../../middleware';
import UserController from '../controller';
import cors from 'cors';

const router = express.Router();

//options for cors midddleware
const options: cors.CorsOptions = {
	allowedHeaders: [
	  'Origin',
	  'X-Requested-With',
	  'Content-Type',
	  'Accept',
	  'X-Access-Token',
	],
	credentials: true,
	methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
	origin: 'http://localhost:3000',
	preflightContinue: false,
  };
  
  //use cors middleware
  router.use(cors(options));
  
// create new user, added validation and middleware for valid requests
router.post(
	'/user',
	UserValidator.checkCreateUser(), 
	Middleware.handleValidationError,
	UserController.create
);

// get all users
router.get(
	'/users',
	UserValidator.checkReadUsers(), 
	Middleware.handleValidationError,
	UserController.users
);

// get user by id
router.get(
	'/users:id',
	UserValidator.checkIdParam(), 
	Middleware.handleValidationError,
	UserController.userByID
);

// update user
router.put(
	'/update/:id',
	UserValidator.checkIdParam(),
	Middleware.handleValidationError,
	UserController.update
);

// delete user by id
router.delete(
	'/delete/:id',
	UserValidator.checkIdParam(),
	Middleware.handleValidationError,
	UserController.delete
);

export default router;