"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const model_1 = require("../model");
class UserValidator {
    checkCreateUser() {
        return [
            (0, express_validator_1.check)('email').custom(value => {
                return model_1.UserInstance.findOne({ where: { email: value } }).then(user => {
                    if (user) {
                        return Promise.reject('E-mail already in use');
                    }
                });
            }),
            (0, express_validator_1.body)('id')
                .optional()
                .isUUID(4)
                .withMessage('The value should be UUID v4'),
            (0, express_validator_1.body)('firstName')
                .notEmpty()
                .withMessage('The firstName value should not be empty'),
            (0, express_validator_1.body)('surname')
                .notEmpty()
                .withMessage('The surname value should not be empty'),
            (0, express_validator_1.body)('email')
                .isEmail().normalizeEmail()
                .withMessage('Invalid email address'),
            (0, express_validator_1.body)('gender')
                .notEmpty()
                .withMessage('The gender value should not be empty'),
            (0, express_validator_1.body)('dob')
                .notEmpty()
                .isISO8601().toDate()
                .withMessage('dob should be date format'),
            (0, express_validator_1.check)('phone')
                .isMobilePhone('any')
                .withMessage('Invalid phone format')
        ];
    }
    checkReadUsers() {
        return [
            (0, express_validator_1.query)('limit')
                .optional()
                .isInt({ min: 1, max: 10 })
                .withMessage('The limit value should be number and between 1-10'),
            (0, express_validator_1.query)('offset')
                .optional()
                .isNumeric()
                .withMessage('The value should be number'),
        ];
    }
    checkIdParam() {
        return [
            (0, express_validator_1.param)('id')
                .notEmpty()
                .withMessage('The value should be not empty')
                .isUUID(4)
                .withMessage('The value should be uuid v4'),
        ];
    }
}
exports.default = new UserValidator();
