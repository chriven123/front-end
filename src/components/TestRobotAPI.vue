<script setup>
import { ref } from "vue";
import {
    loggedUser
} from "../states/loggedUser.js";

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`;
const API_URL = HOST;

const API_chosen = ref("");
const APIs = ref([
    "Richiedi riconoscimento rifiuto",
    "Aggiorna parametri robot",
    "Richiedi piano di pulizia",
    "Richiedi dettagli piano di pulizia",
    "Richiedi posizione dei contenitori"
])

const image_url = ref("")
const capienza_attuale = ref(0);
const temperatura = ref(0);
const batteria = ref(0);
const posizione = ref({
    LAT: 0,
    LON: 0,
    ALT: 0
});
const id_piano = ref("");
const id_zona = ref("");
const example_robot = ref({
    id: "63b1a4bef24bcf19150d3d3d",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjFhNGJlZjI0YmNmMTkxNTBkM2QzZCIsIm5vbWVfb3JnYW5penphemlvbmUiOiIiLCJpYXQiOjE2NzI1ODY0MzB9.J_KGwAnMs8cGGFsL_r79TS0Zrt7G_6DUsssNRPSgG7k"
})
const warningMessage = ref('')
const successMessage = ref('')
const dataToShow = ref("")

function testAPI() {
    warningMessage.value = ""
    successMessage.value = ""
    dataToShow.value = ""

    if (API_chosen.value === "Richiedi riconoscimento rifiuto") {
        fetch(API_URL + "/rifiuto", {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-access-token": example_robot.value.token },
            body: JSON.stringify({
                URL_foto: image_url.value,
                posizione: {
                    LAT: 0,
                    LON: 0,
                    ALT: 0
                }
            })
        })
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                console.log(data)
                if (data.classificazione) {
                    dataToShow.value = data.classificazione;
                }
                else {
                    dataToShow.value = data;
                }
            })
            .catch((error) => console.error(error)); // If there is any error you will catch them here
    } else if (API_chosen.value === "Aggiorna parametri robot") {
        fetch(API_URL + "/robot", {
            method: "PUT",
            headers: { "Content-Type": "application/json", "x-access-token": example_robot.value.token },
            body: JSON.stringify({
                capienza_attuale: capienza_attuale.value,
                temperatura: temperatura.value,
                batteria: batteria.value,
                posizione: posizione.value
            })
        })
            .then(function (resp) {
                if (resp.status === 200) {
                    successMessage.value = 'Parametri aggiornati con successo'
                } else {
                    warningMessage.value = 'Errore nell\'aggiornamento del robot'
                }
            })
            .catch((error) => console.error(error)); // If there is any error you will catch them here
    } else if (API_chosen.value === "Richiedi piano di pulizia") {
        fetch(API_URL + "/piano_pulizia", {
            method: "PATCH",
            headers: { "Content-Type": "application/json", "x-access-token": example_robot.value.token },
        })
            .then(function (resp) {
                if (resp.status === 200) {
                    resp.json().then(function(data) {
                        successMessage.value = 'Piano di pulizia assegnato con successo'

                        dataToShow.value = "ID piano: " + data._id + "\n";
                        dataToShow.value += "ID robot: " + data.ID_robot + "\n";
                        dataToShow.value += "ID zona: " + data.ID_zona + "\n";
                        dataToShow.value += "Data inzio: " + data.data_inizio + "\n";
                        dataToShow.value += "Data fine: " + data.data_fine + "\n";
                        dataToShow.value += "Organizzazione: " + data.nome_organizzazione + "\n";
                    })
                } else {
                    warningMessage.value = 'Errore nell\'assegnamento del piano di pulizia'
                }
            })
            .catch((error) => console.error(error)); // If there is any error you will catch them here
    } else if (API_chosen.value === "Richiedi dettagli piano di pulizia") {
        fetch(API_URL + "/piano_pulizia/robot", {
            method: "GET",
            headers: { "Content-Type": "application/json", "x-access-token": example_robot.value.token }
        })
            .then(function (resp) {
                if (resp.status === 200) {
                    resp.json().then(function(data) {
                        successMessage.value = 'Piano di pulizia assegnato con successo'

                        dataToShow.value = "ID piano: " + data._id + "\n";
                        dataToShow.value += "ID robot: " + data.ID_robot + "\n";
                        dataToShow.value += "ID zona: " + data.ID_zona + "\n";
                        dataToShow.value += "Data inzio: " + data.data_inizio + "\n";
                        dataToShow.value += "Data fine: " + data.data_fine + "\n";
                        dataToShow.value += "Organizzazione: " + data.nome_organizzazione + "\n";
                    })
                } else {
                    warningMessage.value = 'Errore nell\'assegnamento del piano di pulizia'
                }
            })
            .catch((error) => console.error(error)); // If there is any error you will catch them here
    } else if (API_chosen.value === "Richiedi posizione dei contenitori") {
        fetch(API_URL + "/zone/containers/" + id_zona.value, {
            method: "GET",
            headers: { "Content-Type": "application/json", "x-access-token": example_robot.value.token }
        })
            .then(function (resp) {
                if (resp.status === 200) {
                    resp.json().then(function(data) {
                        successMessage.value = 'Posizione dei contenitori richiesta con successo'
                        let containers = data.contenitori_rifiuti;
                        
                        for (let i = 0; i < containers.length; i++) {
                            let container = containers[i];
                            dataToShow.value += "Tipologia: " + container.tipologia + "\n";
                            dataToShow.value += "Posizione: " + container.posizione + "\n";
                        }
                    })
                } else {
                    warningMessage.value = 'Errore nella richiesta della posizione dei contenitori'
                }
            })
            .catch((error) => console.error(error)); // If there is any error you will catch them here
    }
}

</script>

<template>
    <div>
        <h1>Test Robot API</h1>
        <h2>In questa pagina puoi simulare le chiamate alle API del robot</h2>
        <h3>Il robot di esempio è {{ example_robot.id }}</h3>
        <select v-model="API_chosen">
            <option v-for="API in APIs" :value="API">{{ API }}</option>
        </select>
    </div>
    <div v-if="API_chosen === 'Richiedi riconoscimento rifiuto'">
        <label for="image">URL immagine:</label><br>
        <label for="image">A causa del proxy di pythonanywhere si possono inserire solo URL apparti a questi siti: https://www.pythonanywhere.com/whitelist/</label><br>
        <input id="image_url" name="image_url" v-model="image_url"><br>
    </div>
    <div v-if="API_chosen === 'Aggiorna parametri robot'">
        <label for="capienza_attuale">Capienza attuale:</label><br>
        <input type="number" id="capienza_attuale" name="capienza_attuale" v-model="capienza_attuale"><br>
        <label for="temperatura">Temperatura:</label><br>
        <input type="number" id="temperatura" name="temperatura" v-model="temperatura"><br>
        <label for="batteria">Batteria:</label><br>
        <input type="number" id="batteria" name="batteria" v-model="batteria"><br>
        <h2>Posizione</h2>
        <label for="latitudine">Latitudine:</label><br>
        <input type="number" id="latitudine" name="latitudine" v-model="posizione.LAT"><br>
        <label for="longitudine">Longitudine:</label><br>
        <input type="number" id="longitudine" name="longitudine" v-model="posizione.LON"><br>
        <label for="altitudine">Altitudine:</label><br>
        <input type="number" id="altitudine" name="altitudine" v-model="posizione.ALT"><br>
    </div>
    <div v-if="API_chosen === 'Richiedi dettagli piano di pulizia'">
        <label for="id_piano">ID piano:</label><br>
        <input id="id_piano" name="id_piano" v-model="id_piano"><br>
    </div>
    <div v-if="API_chosen === 'Richiedi posizione dei contenitori'">
        <label for="id_zona">ID zona:</label><br>
        <input id="id_zona" name="id_zona" v-model="id_zona"><br>
    </div>
    <div v-if="dataToShow != ''">
        <h2>Response</h2>
        <pre>{{ dataToShow }}</pre>
    </div>
    <br>
    <button style="float: left" @click="testAPI()">Test API</button>
    <span style="color: red; margin: 30px"> {{ warningMessage }} </span>
    <span style="color: white; margin: 30px"> {{ successMessage }} </span>
</template>
