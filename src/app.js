import "dotenv/config"
import "./config/conn.js"
import e from "express";
import maintenance_route from "./routes/maintenance_route";
import vehicle_route from "./routes/vehicle_route.js";
import workshop_route from "./routes/workshop_route.js";

const app = e();
app.use(e.json());

app.use("/maintenance", maintenance_route);
app.use("/vehicle", vehicle_route);
app.use("/workshop", workshop_route);

app.listen(process.env.API_PORT, () => {
    console.log(`Server running at ${process.env.API_PORT}`);
});
