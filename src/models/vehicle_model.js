import {Schema, model} from "mongoose";

const vehicleSchema = new Schema({
    plate: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    model: {
        type: Schema.Types.String,
        required: true
    },
    year: {
        type: Schema.Types.Number,
        required: true
    },
    owner: {
        type: Schema.Types.String,
        required: true
    },
    maintenances: {
        type: [Schema.Types.ObjectId],
        ref: "Maintenances"
    }
});

const Vehicle = model("Vehicles", vehicleSchema);

export default Vehicle;