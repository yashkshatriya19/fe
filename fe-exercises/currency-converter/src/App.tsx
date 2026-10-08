import './App.css'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import { useState } from 'react'

function App() {
  // const [amount, setAmount] = useState(0)
  const [amount, setAmount] = useState<number | "">("")
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("EUR")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const BackgroundImage = "https://img.magnific.com/free-vector/digital-global-currency-icons-concept-background_1017-17455.jpg?semt=ais_hybrid&w=740&q=80"

  const currencyInfo = useCurrencyInfo(from);
  const info = Object.keys(currencyInfo);
  const swap =()=>{
    setTo(from)
    setFrom(to)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }
  // const convert = ()=>{
  //   setConvertedAmount(amount*currencyInfo[to])
  // }
  const convert = () => {
      const rate = currencyInfo[to.toLowerCase()]

      if (rate !== undefined && amount !== "") {
          setConvertedAmount(Number(amount) * rate)
      }
  }
console.log("Currency rates:", currencyInfo)
console.log("Dropdown options:", info)
    return (
      
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('${BackgroundImage}')`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        convert()
                    }}>
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={info}
                                selectCurrency={from}
                                onCurrencyChange={setFrom}
                                onAmountChange={(amount) => setAmount(amount)}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={info}
                                selectCurrency={to}
                                onCurrencyChange={(currency) =>setTo(currency)}
                                amountDisabled={true}
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}  
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App