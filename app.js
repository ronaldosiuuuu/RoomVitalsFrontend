const apiKey = '226cb444-f480-460f-8d80-6e6117afe0d2';


const app = Vue.createApp({

    data(){
        return{
            currentTemperatur: null,
            currentAQ: {
                list:[
                    {
                        main:{
                            aqi: null,
                        },
                    },
                ],
            },
            currentHumidity: null,
            minDefined: 0,
            maxDefined: 100,
            minDefinedHum: 0,
            maxDefinedHum: 100,
            minDefinedAQ: 0,
            maxDefinedAQ: 5,

        };
    },
    methods:{
        fetchCurrentTemperatur(){
            axios.get('https://tempapizealand.azurewebsites.net/api/Temps/temperatur')
            .then(response => {
                this.currentTemperatur = Number(response.data);

            })

        },

        fetchAQ() {
            axios.get('http://api.openweathermap.org/data/2.5/air_pollution?lat=55.6415&lon=12.0803&appid=03d677b35f2e21f149b8c37707848fc7')
                .then(response => {
                    this.currentAQ = response.data;
                    console.log(response.data)

                })
        },
        fetchCurrentHumidity(){
            axios.get('https://tempapizealand.azurewebsites.net/api/Temps/humidity')
            .then(response => {
                this.currentHumidity = response.data;
            })
        },

        temperaturTimer(){
            this.fetchCurrentTemperatur();

            setInterval(this.fetchCurrentTemperatur, 5000)
        },
        humidityTimer(){
            this.fetchCurrentHumidity();
            setInterval(this.fetchCurrentHumidity, 5000)
        },
        aqTimer(){
            this.fetchAQ();
            setInterval(this.fetchAQ, 10000)
        },

        defineTempAndHumidityAndAirQuality(){
            if (this.currentTemperatur < this.minDefined){
                this.temperaturTimer();                
                window.location.href = 'index.html'
                alert("Temperaturen er under den defineret minimum temperatur lige nu!!")
            }            
            else if(this.currentTemperatur > this.maxDefined){
                this.temperaturTimer();
                window.location.href = 'index.html'
                alert("Temperaturen er over den defineret maksinum temperatur lige nu!!")
            }
            else if(this.currentHumidity < this.minDefinedHum){
                this.humidityTimer();
                window.location.href = 'index.html'
                alert("Luftfugtigheden er under den defineret minimum luftfugtighed lige nu!!")
            }
            else if(this.currentHumidity > this.maxDefinedHum){
                this.humidityTimer();
                window.location.href = 'index.html'
                alert("Luftfugtigheden er over den defineret maksimum luftfugtighed lige nu!!")
            }
            else if(this.currentAQ < this.minDefinedAQ){
                this.currentAQ();
                window.location.href = 'index.html'
                alert("Luftkvalitet er under den defineret minimum luftkvalitet lige nu!!")
            }
            else if(this.currentAQ > this.maxDefinedAQ){
                this.currentAQ();
                window.location.href = 'index.html'
                alert("Luftkvalitet er over den defineret maksimum luftkvalitet lige nu!!")
            }
            else{
                window.location.href = 'index.html'
            }
        }

    },
    mounted(){
        this.temperaturTimer();
        this.humidityTimer();
        this.aqTimer();
    },

});

app.mount('#app');