<script>
import { ref, onMounted } from "vue";
import {
    loggedUser
} from "../states/loggedUser.js";

export default {
    name: "RobotInfo",
    props: {
        robot_id: Number,
    },
    data () {
        return {
            robot_info: getRobotInfo(this.robot_id)
        }
    }
}


const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`;
const API_URL = HOST;

function getRobotInfo(id) {
    console.log(id)
    let robotInfo = ref({});
    fetch(API_URL + "/robot/" + id, {
        method: "GET",
        headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token }
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (json) {
            robotInfo.value = json;
        })
        .catch((error) => console.error(error)); // If there is any error you will catch them here
    console.log(robotInfo)
    return robotInfo;
};

</script>

<template>
    <form>
        <h1>Dettagli robot</h1>
        <ul>
            <li>ID: {{ $data.robot_info._id }}</li>
            <li>Batteria: {{ $data.robot_info.batteria }}%</li>
            <li>Temperatura: {{ $data.robot_info.temperatura }}°C</li>
            <li>Capienza attuale: {{ $data.robot_info.capienza_attuale }}%</li>
            <li>Posizione attuale: {{ $data.robot_info.posizione }}</li>
        </ul>
    </form>
</template>
