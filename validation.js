const { body, param } = require('express-validator');

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
            .isFloat({ gt: 0 }).withMessage('Cost must be a number greater than 0')
            .notEmpty().withMessage('Cost is required'),

        body('price')
            .isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0')
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

const idValidationRule = () => {
    return [
        param('id')
            .isMongoId().withMessage('Invalid ID format')
    ];
};

const recipeValidationRules = () => {
    return [
        body('name')
            .isString().withMessage('Name must be a string')
            .notEmpty().withMessage('Name is required')
            .isLength({ min: 1, max: 100 }).withMessage('Name must be between 1 and 100 characters'),

        body('description')
            .isString().withMessage('Description must be a string')
            .notEmpty().withMessage('Description is required')
            .isLength({ min: 1, max: 255 }).withMessage('Description must be between 1 and 255 characters'),

        body('ingredients')
            .isArray().withMessage('Ingredients must be an array')
            .notEmpty().withMessage('Ingredients are required')
            .custom((value) => {
                value.forEach(ingredient => {
                    if (!ingredient.name || typeof ingredient.name !== 'string') {
                        throw new Error('Each ingredient must have a name which is a string');
                    }
                    if (!ingredient.quantity || typeof ingredient.quantity !== 'string') {
                        throw new Error('Each ingredient must have a quantity which is a string');
                    }
                });
                return true;
            }),

        body('instructions')
            .isString().withMessage('Instructions must be a string')
            .notEmpty().withMessage('Instructions are required')
            .isLength({ min: 1, max: 2000 }).withMessage('Instructions must be between 1 and  characters')
    ];
};

module.exports = {
    potionValidationRules,
    idValidationRule,
    recipeValidationRules
};
