import express from 'express';
import mongoose from "mongoose";
import seedRouter from './routes/seedRoutes.js';
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv";
import orderRouter from './routes/orderRoutes.js';
import data from './data.js';


dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.post('/api/products', (req, res) => {
  // Handle the POST request here
  res.send('POST request to /api/products');
});

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use("/api/orders", orderRouter);




app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT ||  9000;
app.listen(port, () => {
    console.log(`server at http://localhost:${port}`)
});