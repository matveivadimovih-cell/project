import { ApiService } from "../serv/api";

const apiService = new ApiService();

const callTime = new Map();

export function apiSecure()
{
    const proxyConsfid = {
        authStrategy: "JWT",
        rateLimitPerSecond: 5,
        apiKey: null,
    }

    const PUBLIC_METHODS = ["login", "getMarketPrice", "getAllMarketPrices"];
    const PRIVATE_METHODS = ["logout", "getPortfolio", "getPortfolioSync", "executeMarketOrder", "placeLimitOrder", "cancelLimitOrder"];

    const handler = {
        get(target, prop, receiver)
        {
            const value = target[prop];

            if(typeof value !== "function")
            {
                return value;
            }

            return function(...args)
            {

            }
        }
    }

}

