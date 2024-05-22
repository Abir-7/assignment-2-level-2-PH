import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRouter } from './app/Modules/Products/product.route';
import { OrderRouter } from './app/Modules/Orders/order.route';

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use('/api/', [ProductRouter, OrderRouter]);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('*', (req, res) => {
  res.status(404).send({
    success: false,
    message: 'Route not found',
  });
});

export default app;
