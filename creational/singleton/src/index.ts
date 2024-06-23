import express, { Request, Response } from 'express';
import {CurrencyConverter} from './currency-converter.service'

const app = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


app.get('/convert', (req: Request, res: Response) => {
  const { baseCurrency, targetCurrency, amount } = req.query;

  if (!baseCurrency || !targetCurrency || !amount) {
    return res.status(400).send({ error: 'baseCurrency, targetCurrency, and amount are required query parameters.' });
  }

  const amountNumber = parseFloat(amount as string);

  if (isNaN(amountNumber)) {
    return res.status(400).send({ error: 'amount must be a valid number.' });
  }

  const currencyConverter = CurrencyConverter.getInstance();
  const result = currencyConverter.convert(baseCurrency as string, targetCurrency as string, amountNumber);

  if (result === null) {
    return res.status(404).send({ error: 'Exchange rate not found for the provided currency pair.' });
  }

  res.status(200).send({ result });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
