import { useEffect, useState } from 'react'

function useCurrencyInfo(currency: string) {
    const [currencyInfo, setCurrencyInfo] = useState<Record<string, number>>({})
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency.toLowerCase()}.json`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch currency rates")
            }
            return response.json()
        })
        .then((data) => {
            setCurrencyInfo(data[currency.toLowerCase()] ?? {})
        })
        .catch((error) => {
            console.error("Currency API error:", error)
        })
                
    }, [currency])
    console.log(currencyInfo);
    return currencyInfo
}

export default useCurrencyInfo