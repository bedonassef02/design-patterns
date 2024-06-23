import { ExchangeRate } from "./exchange-rate.service";

export class CurrencyConverter{
    private exchangeRates: ExchangeRate[] = [];
    constructor(){
        this.loadExchangeRate()
    }


    private loadExchangeRate(){
        this.exchangeRates = [
            new ExchangeRate('USD', 'SAR', 3.75),
            new ExchangeRate('USD', 'EGP', 30.60),
            new ExchangeRate('SAR', 'EGP', 8.16),
        ]
    }

    public convert(baseCurrency:string, targetCurrency: string, amount:number){
        const exchangeRate: ExchangeRate|undefined = this.exchangeRates.find(rate =>
            rate.baseCurrency === baseCurrency && rate.targetCurrency === targetCurrency
        );
        if (exchangeRate) {
            return amount * exchangeRate.rate;
        }
    }
}