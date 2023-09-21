const getCurrencyOptions = async () => {
    const apiUrl = 'https://api.exchangerate.host/symbols';
    const response = await fetch(apiUrl);
    const json = await response.json()
    // console.log(json);
    // console.log(json.symbols);
    return json.symbols;
}
// getCurrencyOptions()

const getCurrencyRate = async (fromCurrency, toCurrency) => {
    const apiUrl = "https://api.exchangerate.host/convert";
    const currencyConvertUrl = new URL(apiUrl)
    currencyConvertUrl.searchParams.append("from", fromCurrency);
    currencyConvertUrl.searchParams.append("to", toCurrency);

    // console.log(currencyConvertUrl);

    const response = await fetch(currencyConvertUrl);
    const json = await response.json()

    // console.log(json);
    // console.log(json.result);

    return json.result
};


    //    OR use the then() method

// const getCurrencyOptions = async () => {
//     const apiUrl = 'https://api.exchangerate.host/symbols';
//     return fetch(apiUrl)
//     .then((response) => response.json())
//     .then((data) => data.symbols);
// }

// const getCurrencyRates = async(fromCurrency, toCurrency) => {
//     const apiUrl = 'https://api.exchangerate.host/convert'
//     const currencyConvertUrl = new URL(apiUrl)
//     currencyConvertUrl.searchParams.append('from', fromCurrency)
//     currencyConvertUrl.searchParams.append('to', toCurrency)

//     const result = fetch(currencyConvertUrl)
//     .then((response) => response.json())
//     .then((data) => data.result)
//     return result;
// }



// to create html element in javaScript
const appendOptionsElToSelectEl = (optionItem, selectEl) => {
    const optionEl = document.createElement("option");
    optionEl.value = optionItem.code;
    optionEl.textContent = optionItem.description;
    selectEl.appendChild(optionEl);
};

const populateSelectEl = (selectEl, optionItem) => {
    optionItem.forEach(optionItem => appendOptionsElToSelectEl(optionItem, selectEl));
};

const setUpCurrency = async () => {
    const fromCurrency = document.querySelector("#fromCurrency");
    const toCurrency = document.querySelector("#toCurrency");

    const currencyOptions = await getCurrencyOptions();
    const currencies = Object.keys(currencyOptions).map(currencyKeys => currencyOptions[currencyKeys])
    console.log(currencies);

    populateSelectEl(fromCurrency, currencies);
    populateSelectEl(toCurrency, currencies);
}
setUpCurrency()


const setUpEventListener = () => {
    const formEl = document.querySelector("#convert");
    formEl.addEventListener("submit", async (event) => {
        event.preventDefault();

        const fromCurrency = document.querySelector("#fromCurrency");
        const toCurrency = document.querySelector("#toCurrency");
        const amount = document.querySelector("#amount");
        const convertResultEl = document.querySelector("#result");

        try {
            const rates = await getCurrencyRate(fromCurrency.value, toCurrency.value);
            const amountValue = Number(amount.value);
            const convertionRate =  Number(amountValue * rates).toFixed(2)
            convertResultEl.textContent = `${amountValue} ${fromCurrency.value} = ${convertionRate} ${toCurrency.value}`;
        }

        catch (err) {
            convertResultEl.textContent = `There Is An Error ${err.message}`;
            convertResultEl.classList.add("error")
        }

    })
}
setUpEventListener();