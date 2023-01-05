<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import {
    loggedUser
} from "../states/loggedUser.js";

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`;
const API_URL = HOST;

const capienza = ref('')
const robot = ref({})
const warningMessage = ref('')
const successMessage = ref('')

function createRobotButton() {
    if ((+capienza.value) < 0) {
        warningMessage.value = 'Capienza non valida'
        return;
    }
    warningMessage.value = ''
    successMessage.value = ''
    createRobot(capienza.value).catch(err => console.error(err));
}

async function createRobot(capienza) {
    let response = await fetch(API_URL + "/robot", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'x-access-token': loggedUser.token },
        body: JSON.stringify( { capienza_attuale: +capienza } ),
    })

    if (response.ok) {
        let json = await response.json();
        robot.value = json;
        console.log(json);

        successMessage.value = 'Robot creato con successo'
    } else {
        console.error("HTTP-Error: " + response.status);
    }
};


</script>

<template>
    <div>
        <h1>Pannello di creazione robot</h1>
        <h2>Benvenuto {{ loggedUser.username }}</h2>
        <form>
            <br />
            <div style="float:left;margin-right:20px;">
                <label> Capienza </label>
                <input v-model="capienza" placeholder="Capienza" />
                <button type="button" @click="createRobotButton">Crea robot con capienza {{ capienza }}</button>
            </div>
            
            <br />
            <span style="color: red"> {{ warningMessage }} </span>
            <span style="color: white"> {{ successMessage }} </span>
        </form>
        <br><br><br><br>
        <div>
            <h3 v-if="robot.id"> ID: {{ robot.id }} </h3>
            <h3 v-if="robot.token"> Token: {{ robot.token }} </h3>
        </div>
    </div>
</template>
