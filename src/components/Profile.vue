<script setup>
import { ref, onMounted } from "vue";
import {
    loggedUser
} from "../states/loggedUser.js";

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`;
const API_URL = HOST;

let userData = ref({});

function getProfile() {
  fetch(API_URL + "/utente/profile", {
    method: "GET",
    headers: { "Content-Type": "application/json" , "x-access-token": loggedUser.token}
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
        console.log(data);
        data = data.profile;
        userData.value.username = data.username;
        userData.value.email = data.email;
        userData.value.numero_tel = data.numero_tel;
        userData.value.ruolo = data.ruolo;
        loggedUser.ruolo = data.ruolo;
        console.log(userData);
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}

onMounted(() => {
  getProfile();
});

</script>

<template>
    <div>
        <h1>Profile</h1>
        <p>Username: {{ userData.username }}</p>
        <p>Email: {{ userData.email }}</p>
        <p>Numero di telefono: {{ userData.numero_tel }}</p>
        <p>Ruolo: {{ userData.ruolo }}</p>
    </div>
</template>
