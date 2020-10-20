import { LightningElement } from 'lwc';

export default class CurrencyComponent extends LightningElement {
    result = [];
    base;
    date;
    endPoint = 'https://api.ratesapi.io/api/latest';


    updateData(){
        this.getValues();
    }

    connectedCallback(){
        this.getValues();
    }

    getValues() {
        fetch(this.endPoint, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(resJson => {
            this.result = [];
            let i = 0;
            this.base = resJson.base;
            this.date = resJson.date;
            let rates = resJson.rates;
            for (let [key, value] of Object.entries(rates)) {
                this.result.push({
                    id: i,
                    key: key,
                    value: value
                })
                i++;
              }          
                        
        })
    }
}