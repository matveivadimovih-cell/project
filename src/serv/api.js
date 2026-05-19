import { market } from "./market.js"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export class ApiService
{
    constructor(balance = 10000)
    {
        this.userBalance = balance;
        this.userPortfolio = new Map()
        this.authToken = null;
        this.tokenTimeTo = null;

        this._subscribeMarketEvents()
    }

    async login(username, password)
    {
        await delay(200);

        if(username === "user" && password === "123")
        {
            this.authToken = `token_${Date.now()}`
            this.tokemTimeTo = Date.now() + 5 * 60 * 1000;
            return {success: true, token: this.authToken};
        }
        throw new Error("Invalid username or password")
    }

    async logout()
    {
        await delay(200);
        this.authToken = null;
        this.tokenTimeTo = null;
    }

    isAuthorized()
    {
        return (this.authToken != null && Date.now() < this.tokenTimeTo);
    }

    async getStockPrice(symbol) 
    {

    }

    async getAllPrices() 
    {

    }
}