import Maintenance from "../models/maintenance_model.js";
import Vehicle from "../models/vehicle_model.js";
import Workshop from "../models/workshop_model.js";

const store = async(req, res) => {
    try{
        let custoTotal = 0;
        req.body.services.forEach(service, () => {
            custoTotal += service.price;
        });
        const veiculo = await Vehicle.findOne({_id: req.body.vehicle});
        const loja = await Workshop.findOne({_id: req.body.workshop});
        const novo = await Maintenance.create({
            workshop: req.body.workshop,
            vehicle: req.body.vehicle,
            services: req.body.services,
            date: req.body.date,
            totalCost: custoTotal
        });
        veiculo.maintenances.push(novo);
        loja.maintenances.push(novo);
        await veiculo.save();
        await loja.save();
    } catch(error){

    }
}

const index = async(req, res) => {
    try{
        const items = await Maintenance.find();
        res.status(200).json(items);
    } catch(error){
        res.status(400).json(400);
    }
}

const show = async(req, res) => {
    try{
        const item = await Maintenance.findById(req.params.id).populate("vehicle").populate("workshop");
        res.status(200).json(item);
    } catch(error){
        res.status(400).json(error);
    }   
}

const update = async(req, res) => {
    try{
        let custoTotal = 0;
        req.body.services.forEach(service, () => {
            custoTotal += service.price;
        });
        const previousMaintenance = await Maintenance.findOne(req.params.id);
        previousVehicle = await Vehicle.findOne(previousMaintenance.vehicle);
        previousShop = await Workshop.findOne(previousMaintenance.workshop);
        previousVehicle.maintenances = previousVehicle.maintenances.filter(maintenance => maintenance.toString() !== req.params.id);
        previousShop.maintenances = previousShop.maintenances.filter(maintenance => maintenance.toString() !== req.params.id);
        await previousShop.save();
        await previousVehicle.save();
        const item = await Maintenance.findByIdAndUpdate(req.params.id, {
            workshop: req.body.workshop,
            vehicle: req.body.vehicle,
            services: req.body.services,
            date: req.body.date,
            totalCost: custoTotal
        });
        const veiculo = await Vehicle.findOne({_id: req.body.vehicle});
        const loja = await Workshop.findOne({_id: req.body.workshop});
        veiculo.maintenances.push(novo);
        loja.maintenances.push(novo);
        await veiculo.save();
        await loja.save();
    } catch(error){
        res.status(400).json(error);
    }
}

const destroy = async(req, res) => {
    try{
        const previousMaintenance = await Maintenance.findOne(req.params.id);
        previousVehicle = await Vehicle.findOne(previousMaintenance.vehicle);
        previousShop = await Workshop.findOne(previousMaintenance.workshop);
        previousVehicle.maintenances = previousVehicle.maintenances.filter(maintenance => maintenance.toString() !== req.params.id);
        previousShop.maintenances = previousShop.maintenances.filter(maintenance => maintenance.toString() !== req.params.id);
        await previousShop.save();
        await previousVehicle.save();
        await Maintenance.findByIdAndDelete(req.params.id);
    } catch(error){
        res.status(400).json(error);
    }
}

export default {store, index, show, update, destroy};