import Vehicle from "../models/vehicle_model.js";

const store = async(req, res) => {
    try{
        const novo = await Vehicle.create({
            plate: req.body.plate,
            model: req.body.model,
            year: req.body.year,
            owner: req.body.owner
        });
        res.status(200).json(novo);
    } catch(error){
        res.status(400).json(error);
    }
}

const index = async(req, res) => {
    try{
        const items = await Vehicle.find();
        res.status(200).json(items);
    } catch(error){
        res.status(400).json(error);
    }
}

const show = async(req, res) => {
    try{
        const item = await Vehicle.findById(req.params.id).populate("maintenances");
        res.status(200).json(item);
    } catch(error){
        res.status(400).json(error);
    }
}

const update = async(req, res) => {
    try{
        const novo = await Vehicle.findByIdAndUpdate(req.params.id, {
            plate: req.body.plate,
            model: req.body.model,
            year: req.body.year,
            owner: req.body.owner
        });
        res.status(200).json(novo);
    } catch(error){
        res.status(400).json(error);
    }
}

const destroy = async(req, res) => {
    try{
        await Vehicle.findByIdAndDelete(req.params.id);
        res.status(200);
    } catch(error){
        res.status(400).json(error);
    }
}

export default {store, index, show, update, destroy};