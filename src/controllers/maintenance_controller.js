import Maintenance from "../models/maintenance_model.js";
import Vehicle from "../models/vehicle_model.js";
import Workshop from "../models/workshop_model.js";

const store = async(req, res) => {
    try{
        let custoTotal = 0;
        req.body.services.forEach(service, () => {
            custoTotal += service.price;
        });
        const veiculo = await Vehicle.findById(req.body.vehicle).exec();
        const loja = await Workshop.findById(req.body.workshop).exec();
        const novo = await Maintenance.create({
            workshop: req.body.workshop,
            vehicle: req.body.vehicle,
            services: req.body.services,
            date: req.body.date,
            totalCost: custoTotal
        });
        veiculo.maintenances.push(novo._id);
        loja.maintenances.push(novo._id);
        await veiculo.save();
        await loja.save();
        res.status(200).json(novo);
    } catch(error){
        res.status(500).json(error.message);
    }
}

const index = async(req, res) => {
    try{
        const items = await Maintenance.find().exec();
        res.json(items);
    } catch(error){
        res.status(500).json(error);
    }
}

const show = async(req, res) => {
    try{
        const item = await Maintenance.findById(req.params.id).populate("[vehicle, workshop]").exec();
        res.json(item);
    } catch(error){
        res.status(500).json(error);
    }   
}

const update = async(req, res) => {
    try{
        let custoTotal = 0;
        req.body.services.forEach(service, () => {
            custoTotal += service.price;
        });
        const previousMaintenance = await Maintenance.findById(req.params.id).exec();
        const previousVehicle = await Vehicle.findById(previousMaintenance.vehicle).exec();
        const previousShop = await Workshop.findById(previousMaintenance.workshop).exec();
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
        const veiculo = await Vehicle.findById(req.body.vehicle).exec();
        const loja = await Workshop.findById(req.body.workshop).exec();
        veiculo.maintenances.push(novo._id);
        loja.maintenances.push(novo._id);
        await veiculo.save();
        await loja.save();
        res.status(200).json(novo);
    } catch(error){
        res.status(500).json(error);
    }
}

const destroy = async(req, res) => {
    try{
        const previousMaintenance = await Maintenance.findById(req.params.id).exec();
        const previousVehicle = await Vehicle.findById(previousMaintenance.vehicle).exec();
        const previousShop = await Workshop.findById(previousMaintenance.workshop).exec();
        previousVehicle.maintenances = previousVehicle.maintenances.filter(maintenance => maintenance.toString() !== req.params.id);
        previousShop.maintenances = previousShop.maintenances.filter(maintenance => maintenance.toString() !== req.params.id);
        await previousShop.save();
        await previousVehicle.save();
        await Maintenance.findByIdAndDelete(req.params.id).exec();
        res.status(200)
    } catch(error){
        res.status(500).json(error);
    }
}

export default {store, index, show, update, destroy};
