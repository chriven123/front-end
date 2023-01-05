<script>
import { ref } from "vue";
import {
    loggedUser
} from "../states/loggedUser.js";

export default {
    name: "TrashInfo",
    props: {
        org_name: String,
        plan_id: Number,
        trash_id: Number,
        zone_id: Number
    },
    methods: {
        classifyTrash: classifyTrash
    },
    data() {
        return {
            trash_info: getTrashInfo(this.plan_id, this.trash_id, this.zone_id),
            wantToClassify: wantToClassify,
            categories: categories,
            classification: classification
        }
    }
}
const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`;
const API_URL = HOST;

const wantToClassify = ref(false);
const categories = ref([
    "Plastica",
    "Vetro",
    "Carta",
    "Metallo",
    "Organico",
    "Indifferenziato",
    "Non riconosciuto"
]);
const classification = ref("");

function getTrashInfo(plan_id, trash_id, zone_id) {
    console.log(trash_id)
    let trashInfo = ref({});

    fetch(API_URL + "/rifiuto/toclassify?" + new URLSearchParams({ id_zona: zone_id }), {
        method: "GET",
        headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token }
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (json) {
            // turn the json in an array if it's not
            if (!Array.isArray(json)) {
                json = [json];
            }
            console.log(json)
            for (let i = 0; i < json.length; i++) {
                if (json[i]._id === trash_id) {
                    trashInfo.value = json[i];
                }
            }
        })
        .catch((error) => console.error(error)); // If there is any error you will catch them here
    console.log(trashInfo)
    loggedUser.currentTrash = trash_id;
    return trashInfo;
};

function classifyTrash(trash_id) {
    console.log("Chiamata a classifica rifiuto: " + wantToClassify.value);
    if (!wantToClassify.value) {
        wantToClassify.value = true;
        return;
    }

    console.log("Classificazione rifiuto: " + classification.value)
    
    fetch(API_URL + "/rifiuto/" + trash_id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token },
        body: JSON.stringify({
            classificazione: classification.value
        })
    }).catch((error) => console.error(error)); // If there is any error you will catch them here

    wantToClassify.value = false;
    this.$router.replace("/organisations/" + this.org_name + "/plans/" + this.plan_id + "/toclassify");
};

</script>

<template>
    <form>
        <h1>Dettagli rifiuto non riconosciuto</h1>
        <ul>
            <li>ID: {{ $data.trash_info._id }}</li>
            <li>Zona: {{ $data.trash_info.id_zona }}</li>
            <li>Stato classificazione: {{ $data.trash_info.classificazione }}</li>
            <li>Posizione rilevata: {{ $data.trash_info.posizione }}</li>
            <div style="float: right; margin-top: -155px;">
                <h1>Foto rifiuto</h1>
                <img :src="$data.trash_info.URL_foto" width="500" height="400">
            </div>
            <br>
            <div v-if="$data.wantToClassify">
                <h2>Classifica rifiuto</h2>
                <select v-model="$data.classification">
                    <option v-for="category in $data.categories" :value="category">{{ category }}</option>
                </select>
            </div>
        </ul>
    </form>
    <br>
    <button style="float: left; margin-left:30px" @click="classifyTrash($data.trash_info._id)">Classifica rifiuto</button>
</template>
