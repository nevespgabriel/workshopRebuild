import mongoose from "mongoose";

(async () => {
    try{
        await mongoose.connect(process.env.URI);
        console.log("Conectdo ao BD com sucesso.");
    } catch(e){
        console.log("Não foi possível conectar o BD.");
    }
})();