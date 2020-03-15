<template>
    <div class="outerDiv">
        <div class="leftDiv">

            <Header><h1>Welcome to Stock Viewer</h1></Header>

            <div>
                <label class="typo__label">Select with search</label>
                <multiselect v-model="value" :options="options" :custom-label="nameWithSym" placeholder="Select one" label="name" track-by="name"></multiselect>
                <pre class="language-json"><code>{{ value }}</code></pre>
            </div>

        </div>

        <div class="rightDiv">
            <ul v-if="options">
                {{getStockData()}}
                {{value}}
            </ul>
        </div>
    </div>


</template>

<script>
    import Multiselect from 'vue-multiselect'
    export default {
        name: 'Home',
        components: {
            // eslint-disable-next-line vue/no-unused-components
            Multiselect
        },
        data() {
            return {
                stockData: [],
                value: [],
                options: [],
                message: 'Stock data will appear here'
            }

        },
        mounted() {
            let multiselect = [];
            // Create a request variable and assign a new XMLHttpRequest object to it.
            let request = new XMLHttpRequest();
            //build url
            let stockSymbols = 'https://api.iextrading.com/1.0/ref-data/symbols';     //needs to be const somewhere
            let url = new URL(stockSymbols);
            // Open a new connection, using the GET request on the URL endpoint;
            request.open('GET', url, true);

            request.onload = function() {
                if(request.status >= 200 && request.status < 400) {
                    let data = JSON.parse(this.response);
                    console.log(data);
                    data.forEach(stock => {
                        // console.log(country.name)
                        //let price = this.getStockData();
                        let elmt = {name : stock.name, symbol: stock.symbol};
                        multiselect.push(elmt)
                    } )
                }
            };
            // Send request
            this.options = multiselect;
            request.send()
        },
        methods: {
            nameWithSym ({ name, symbol }) {
                return `${name} — [${symbol}]`
            },
            getStockData() {
                let request = new XMLHttpRequest();
                let stockSymbol = this.value.symbol;
                const API_TOKEN = process.env.VUE_APP_API_TOKEN;
                if (stockSymbol !== undefined) {
                    console.log("The symbol -->" + this.value.symbol);
                    console.log(API_TOKEN);
                    let stockData = `https://cloud.iexapis.com/stable/stock/${stockSymbol}/quote?token=${API_TOKEN}`;
                    //let stockData = `https://api.iextrading.com/1.0/tops/last?symbols=${this.value.symbol}`;
                    console.log(stockData);
                    let newPush = [];
                    let url = new URL(stockData);
                    request.open('GET', url, true);
                    request.onload = function () {
                        if (request.status >= 200 && request.status < 400) {
                            let data = JSON.parse(this.response);
                            console.log(data);
                            console.log();
                            let elmt = {data: data.price}
                            newPush.push(elmt);
                        }
                    };
                    request.send();
                    this.stockData = newPush;
                }
            }
        }

    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>


<style scoped>
    body { background: navy !important; } /* Adding !important forces the browser to overwrite the default style applied by Bootstrap */
    .outerDiv
    {


        height: 200%;
        width: 150%;
        padding: 5px;
    }
    .leftDiv
    {

        float: left;
        height: 200%;
        width: 48%;
    }
    .rightDiv
    {

        height: 200%;
        width: 48%;
        float: right;
    }
</style>