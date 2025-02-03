import {Schema, model} from "mongoose";

const serviceSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    price:{
        type: Schema.Types.Number,
        required: true
    }
});

const maintenanceSchema = new Schema({
    workshop:{
        type: Schema.Types.ObjectId,
        ref: "Workshops",
        required: true
    }, 
    vehicle:{
        type: Schema.Types.ObjectId,
        ref: "Vehicles",
        required: true
    },
    services: {
        type: [serviceSchema],
        required: true,
        minLength: 1
    },
    date: {
        type: Schema.Types.Date,
        required: true
    },
    totalCost: {
        type: Schema.Types.Number,
        required: true
    }
});

const Maintenance = model("Maintenances", maintenanceSchema);

export default Maintenance;