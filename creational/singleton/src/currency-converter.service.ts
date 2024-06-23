import { ExchangeRate } from './exchange-rate.service';

export class CurrencyConverter {
    private static instance: CurrencyConverter;
    private exchangeRates: ExchangeRate[] = [];

    private constructor() {
        this.loadExchangeRates();
    }

    public static getInstance(): CurrencyConverter {
        if (!CurrencyConverter.instance) {
            CurrencyConverter.instance = new CurrencyConverter();
        }
        return CurrencyConverter.instance;
    }

    private loadExchangeRates() {
        this.exchangeRates = [
            new ExchangeRate('USD', 'SAR', 3.75),
            new ExchangeRate('USD', 'EGP', 30.60),
            new ExchangeRate('SAR', 'EGP', 8.16),
        ];
    }

    public convert(baseCurrency: string, targetCurrency: string, amount: number): number | null {
        const exchangeRate = this.exchangeRates.find(rate =>
            rate.baseCurrency === baseCurrency && rate.targetCurrency === targetCurrency
        );

        if (exchangeRate) {
            return amount * exchangeRate.rate;
        } else {
            console.error(`Exchange rate from ${baseCurrency} to ${targetCurrency} not found.`);
            return null;
        }
    }
}
