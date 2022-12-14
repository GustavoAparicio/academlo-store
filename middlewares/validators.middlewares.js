const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError.util');

const checkValidations = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
		const errorMessages = errors.array().map(err => err.msg);

		const message = errorMessages.join('. ');

		return next(new AppError(message, 400));
	}

	next();
};

const createUserValidators = [
	body('username')
		.isString()
		.withMessage('Name must be a string')
		.notEmpty()
		.withMessage('Name cannot be empty')
		.isLength({ min: 3 })
		.withMessage('Name must be at least 3 characters'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	body('password')
		.isString()
		.withMessage('Password must be a string')
		.notEmpty()
		.withMessage('Password cannot be empty')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters'),
	checkValidations,
];

const createProductValidators = [
	body('title')
		.isString()
		.withMessage('Name must be a string')
		.notEmpty()
		.withMessage('Name cannot be empty')
		.isLength({ min: 2 })
		.withMessage('Name must be at least 3 characters'),
	body('description')
		.isString()
		.withMessage('Description mus be a string')
		.isLength({ min: 10 })
		.withMessage('Description must be at least 15 characters')
		.notEmpty()
		.withMessage('Description cannot be empty, you need to fill out it'),
	body('quantity')
		.isNumeric()
		.withMessage('Quantity must be a number')
		.notEmpty()
		.withMessage('Quantity cannot be empty'),
	body('price')
		.isNumeric()
		.withMessage('Price must be a number')
		.notEmpty()
		.withMessage('Price cannot be empty'),
	body('categoryId')
		.isNumeric()
		.withMessage('CategoryId must be a number')
		.notEmpty()
		.withMessage('CategoryId cannot be empty'),
	checkValidations,
];


module.exports = { createUserValidators, createProductValidators };
