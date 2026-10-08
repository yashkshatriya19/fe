import { useId } from "react"

interface InputBoxProps {
    label: string;
    amount: number | "";
    onCurrencyChange: (currency: string) => void;
    onAmountChange: (amount: number | "") => void;
    currencyOptions?: string[];
    selectCurrency?: string;
    amountDisabled?: boolean;
    currencyDisabled?: boolean;
    className?: string;
}

function InputBox({
    label,
    amount,
    onCurrencyChange,
    onAmountChange,
    currencyOptions=[],
    selectCurrency="",
    amountDisabled=false,
    currencyDisabled=false,
    className = "",
}: InputBoxProps) {
   const amountInputId = useId();

    return (
        
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-black/40 mb-2">
                    {label}
                </label>
                {/* <input
                    id={amountInputId}  
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisabled}
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                /> */}
                
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5 text-black"
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => {
                        const value = e.target.value
                        onAmountChange(value === "" ? "" : Number(value))
                    }}
                    disabled={amountDisabled}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                {/* <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none" 
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisabled} 
                >
                    
                        {currencyOptions.map((currency)=>(
                            <option value={currency} key={currency}>{currency}</option>
                        ))}
                
                </select> */}
                <select
                    className="rounded-lg px-2 py-2 bg-gray-100 text-black cursor-pointer outline-none w-24"
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange(e.target.value)}
                    disabled={currencyDisabled}
                >
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;
