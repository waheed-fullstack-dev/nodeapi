import {check, body, param, query } from 'express-validator';
import { UserInstance } from "../model";

class UserValidator {
	checkCreateUser() {
		return [
			check('email').custom(value => {
				return UserInstance.findOne({ where: { email: value } }).then(user => {
				  if (user) {
					return Promise.reject('E-mail already in use');
				  }
				});
			}),
			body('id')
				.optional()
				.isUUID(4)
				.withMessage('The value should be UUID v4'),
			body('firstName')
				.notEmpty()
				.withMessage('The firstName value should not be empty')
				.isLength({ min: 3, max:20 })
				.withMessage('The firstName value should be between 3 to 20 character'),
            body('surname')
				.notEmpty()
				.withMessage('The surname value should not be empty')
				.isLength({ min: 3, max:20 })
				.withMessage('The surname value should be between 3 to 20 character'),
            body('email')
                .isEmail().normalizeEmail()
				.withMessage('Invalid email address'),
            body('gender')
				.notEmpty()
				.withMessage('The gender value should not be empty'),
            body('dob')
				.notEmpty()
				.isISO8601().toDate()
				.withMessage('dob should be date format'),
            check('phone')
				.isMobilePhone('any')
				.withMessage('Invalid phone format')
		];
	}

	checkReadUsers() {
		return [
			query('limit')
				.optional()
				.isInt({ min: 1, max: 10 })
				.withMessage('The limit value should be number and between 1-10'),
			query('offset')
				.optional()
				.isNumeric()
				.withMessage('The value should be number'),
		];
	}
	
	checkIdParam() {
		return [
			param('id')
				.notEmpty()
				.withMessage('The value should be not empty')
				.isUUID(4)
				.withMessage('The value should be uuid v4'),
		];
	}
}

export default new UserValidator();
