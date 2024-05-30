const { body } = require('express-validator');

const potionValidationRules = () => {
    return [
        body('name')
            .isString().withMessage('Name must be a string')
            .notEmpty().withMessage('Name is required')
            .isLength({ min: 1, max: 100 }).withMessage('Name must be between 1 and 100 characters'),

        body('properties')
            .isString().withMessage('Properties must be a string')
            .notEmpty().withMessage('Properties are required')
            .isLength({ min: 1, max: 255 }).withMessage('Properties must be between 1 and 255 characters'),

        body('cost')
            .isFloat({ gt: -1 }).withMessage('Cost must be a number greater than or equal to 0')
            .notEmpty().withMessage('Cost is required'),

        body('price')
            .isFloat({ gt: -1 }).withMessage('Price must be a number greater than or equal to 0')
            .notEmpty().withMessage('Price is required'),

        body('quantity')
            .isInt({ gt: -1 }).withMessage('Quantity must be an integer greater than or equal to 0')
            .notEmpty().withMessage('Quantity is required'),

        body('supplier')
            .optional()
            .isString().withMessage('Supplier must be a string')
            .isLength({ max: 100 }).withMessage('Supplier must be less than or equal to 100 characters')
    ];
};

module.exports = {
    potionValidationRules
};