import express from "express";
import {runiterative} from "./routes/iterative.js"; 
const app = express();
const port = 3000;
import dotenv from "dotenv";
dotenv.config();
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.get("/iterative",async (req,res)=>{
  res.send("iterative"+await runiterative());
});
