const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;
const dotenv = require('dotenv');
dotenv.config();
const dbName = process.env.DATABASE_NAME;

const getAll = async (req, res, next) => {
    const potions = await mongodb.getDb().db(dbName).collection('Potions').find();

    potions.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });

};

const getSingle = async (req, res, next) => {

    const idString = String(req.params.id);
    const potionId = new ObjectId(idString);
    const result = await mongodb.getDb().db(dbName).collection('Potions').find({ _id: potionId });

    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });

};

const create = async (req, res, next) => {
    const potion = {
        name: req.body.name,
        properties: req.body.properties,
        cost: req.body.cost,
        price: req.body.price,
        quantity: req.body.quantity,
        supplier: req.body.supplier
    };
    const response = await mongodb.getDb().db(dbName).collection('Potions').insertOne(potion);

    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Error! Potion not added.');
    }
    console.log(res.statusCode);

};

const update = async (req, res, next) => {
    const potion = {
        name: req.body.name,
        properties: req.body.properties,
        cost: req.body.cost,
        price: req.body.price,
        quantity: req.body.quantity,
        supplier: req.body.supplier
    };

    const idString = String(req.params.id);
    const potionId = new ObjectId(idString);
    const response = await mongodb.getDb().db(dbName).collection('Potions').replaceOne({ _id: potionId }, potion);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error! potion not updated.');
    }
    console.log(res.statusCode);
};

const del = async (req, res, next) => {
    const idString = String(req.params.id);
    const potionId = new ObjectId(idString);
    const response = await mongodb.getDb().db(dbName).collection('Potions').deleteOne({ _id: potionId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Error! Unable to delete!');
    }
    console.log(res.statusCode);

};

module.exports = { getAll, getSingle, create, update, del };