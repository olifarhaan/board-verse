require("dotenv").config()
import { server } from "./app";

const PORT= process.env.PORT as string;

const start= async()=>{
    try {
        server.listen(PORT, ()=>{
            console.log("Server started at port:", +PORT);
        })
    } catch (error: any) {
        console.log(error.message);
    }
}
start()