import {Schema, model} from "mongoose";

const workshopSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    address: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    specialties: {
        type: [Schema.Types.String],
        required: true
    },
    maintenances:{
        type: [Schema.ObjectId],
        ref: "Maintenances"
    }
});

const Workshop = model("Workshops", workshopSchema);

export default Workshop;
