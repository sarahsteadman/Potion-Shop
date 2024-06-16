const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;
const dotenv = require('dotenv');
dotenv.config();
const dbName = process.env.DATABASE_NAME;

// const { potionValidationRules } = require('../validation');
const { validationResult } = require('express-validator');

const getAll = async (req, res, next) => {
    try {
        const recipes = await mongodb.getDb().db(dbName).collection('Recipes').find();

        recipes.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    }
    catch {
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
};

const getSingle = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const idString = String(req.params.id);
        const recipeId = new ObjectId(idString);
        const result = await mongodb.getDb().db(dbName).collection('Recipes').find({ _id: recipeId });

        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch recipe' });
    }
};

const create = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const recipe = {
            name: req.body.name,
            description: req.body.description,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions
        };
        const response = await mongodb.getDb().db(dbName).collection('Recipes').insertOne(recipe);

        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Error! Recipe not added.');
        }
        console.log(res.statusCode);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create recipe' });
    }

};

const update = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const recipe = {
            name: req.body.name,
            description: req.body.description,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions
        };

        const idString = String(req.params.id);
        const recipeId = new ObjectId(idString);
        const response = await mongodb.getDb().db(dbName).collection('Recipes').replaceOne({ _id: recipeId }, recipe);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Error! recipe not updated.');
        }
        console.log(res.statusCode);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update recipe' });
    }
};

const del = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const idString = String(req.params.id);
        const recipeId = new ObjectId(idString);
        const response = await mongodb.getDb().db(dbName).collection('Recipes').deleteOne({ _id: recipeId }, true);
        console.log(response);
        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json(response.error || 'Error! Unable to delete!');
        }
        console.log(res.statusCode);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete recipe' });
    }
};

module.exports = { getAll, getSingle, create, update, del };