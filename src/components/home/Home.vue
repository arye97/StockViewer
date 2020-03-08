<template>
    <div class="outerDiv">
        <div class="leftDiv">

            <Header><h1>Welcome to Stock Viewer</h1></Header>

            <label class="form-control">Find a stock on the NASDAQ</label>
            <multiselect v-model="value" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="false" placeholder="Add a stock" label="name" id="stockBox" track-by="name" :preselect-first="false">
                <template slot="selection" slot-scope="{ values, search, isOpen }">
                    <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
                </template>
            </multiselect>

            <footer>Data provided for free by IEX.</footer>

        </div>

        <div class="rightDiv">

            <ul v-if="options">
                <li v-for="value in this.value" :key="value.name">
                    {{value.name}}
                </li>
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
                    data.forEach(stock => {
                        // console.log(country.name)
                        let elmt = {name : stock.name, symbol: stock.symbol};
                        multiselect.push(elmt)
                    } )
                }
            };
            // Send request
            this.options = multiselect;
            request.send()
        },

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