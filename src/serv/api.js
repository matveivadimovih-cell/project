export class ApiService
{
    constructor(balance = 10000)
    {
        this.userBalance = balance;
    }
    
    getBalance()
    {
        console.log("[API] get balance")
        return {balance: this.userBalance};
    }
}