<script setup>
import { ref, onMounted } from "vue";
import {
  loggedUser,
  setLoggedUser,
  clearLoggedUser,
} from "../states/loggedUser.js";

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`;
const API_URL = HOST;

const username = ref("");
const password = ref("");

// const loggedUser = ref({})
// const loggedUser = defineProps(['loggedUser'])
const emit = defineEmits(["login"]);

function login() {
  fetch(API_URL + "/utente/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username.value, password: password.value }),
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      data.username = username.value;
      // Here you get the data to modify as you please
      console.log(data);
      setLoggedUser(data);

      emit("login", loggedUser);
      return;
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}

function logout() {
  clearLoggedUser();
}
</script>

<template>
  <form>
    <span v-if="loggedUser.token">
      Welcome {{ loggedUser.username }}
    </span>

    <span v-if="!loggedUser.token">
      <input name="username" v-model="username" placeholder="username"/>
      <input name="password" type="password" v-model="password" placeholder="password"/>
      <button type="button" @click="login">LogIn</button>
    </span>
  </form>
</template>
