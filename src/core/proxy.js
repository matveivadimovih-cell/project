import { ApiService } from "../serv/api";

const apiService = new ApiService();

const callTime = new Map();

export function apiSecure()
{
    const proxyConfig = {
        authStrategy: "JWT", // OAuth, API_Key, JWT
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
                const now = Date.now();
                if(!callTime.has(prop))
                {
                    callTime.set(prop, []);
                }

                const recentCalls = callTime.get(prop).filter((time) => now - time < 1000)
                if(recentCalls.length >= proxyConfig.rateLimitPerSecond)
                {
                    throw new Error("too many requests");
                }

                recentCalls.push(now);
                callTime.set(prop, recentCalls);

                if(PRIVATE_METHODS.includes(prop))
                {
                    let isAuth = false;

                    if(proxyConfig.authStrategy === "JWT" || proxyConfig.authStrategy === "OAuth")
                    {
                        isAuth = target.isAuthorized();
                    }
                    else if(proxyConfig.authStrategy === "API_Key")
                    {
                        isAuth = proxyConfig.apiKey === "good_key_1";
                    }
                    
                    if(!isAuth)
                    {
                        throw new Error("Unauthorized");
                    }
                }
            }
        }
    }

    const apiProxy = new Proxy(apiService, handler);

}
