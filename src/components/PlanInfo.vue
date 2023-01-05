<script>
import { ref } from "vue";
import {
    loggedUser
} from "../states/loggedUser.js";

export default {
    name: "PlanInfo",
    props: {
        plan_id: Number,
    },
    data () {
        return {
            plan_info: getPlanInfo(this.plan_id)
        }
    }
}
const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`;
const API_URL = HOST;

function getPlanInfo(id) {
    console.log(id)
    let planInfo = ref({});
    fetch(API_URL + "/piano_pulizia/organization/" + id, {
        method: "GET",
        headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token }
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (json) {
            planInfo.value = json;
        })
        .catch((error) => console.error(error)); // If there is any error you will catch them here
    console.log(planInfo)
    loggedUser.currentPlan = id;
    return planInfo;
};

</script>

<template>
    <form>
        <h1>Dettagli piano pulizia</h1>
        <ul>
            <li>ID: {{ $data.plan_info._id }}</li>
            <li>Zona: {{ $data.plan_info.ID_zona }}</li>
            <li>Data di inzio: {{ $data.plan_info.data_inizio }}</li>
            <li>Data fine: {{ $data.plan_info.data_fine }}</li>
            <li>Robot assegnato: {{ $data.plan_info.ID_robot != "" ? $data.plan_info.ID_robot : "Nessun robot assegnato" }}</li>
        </ul>
    </form>
</template>
