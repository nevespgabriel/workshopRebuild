import Workshop from "../models/workshop_model.js";

const store = async(req, res) => {
    try{
        const novo = await Workshop.create({
            name: req.body.name,
            address: req.body.address,
            specialties: req.body.specialties
        });
        res.status(201).json(novo);
    } catch(error){
        res.status(500).json(error);
    }
}

const index = async(req, res) => {
    try{
        const items = await Workshop.find().exec();
        res.json(items);
    } catch(error){
        res.status(500).json(error);
    }
}

const show = async(req, res) => {
    try{
        const item = await Workshop.findById(req.params.id).populate("maintenances").exec();
        res.json(item);
    } catch(error){
        res.status(500).json(error);
    }
}

const update = async(req, res) => {
    try{
        const novo = {
            name: req.body.name,
            address: req.body.address,
            specialties: req.body.specialties
        }
        await Workshop.findByIdAndUpdate(req.params.id, novo).exec();
        res.status(200).json(novo);
    } catch(error){
        res.status(500).json(error);
    }
}

const destroy = async(req, res) => {
    try{
        await Workshop.findByIdAndDelete(req.params.id).exec();
        res.status(200);
    } catch(error){
        res.status(500).json(error);
    }
}

export default {store, index, show, update, destroy};
