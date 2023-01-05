<script setup>
import { ref, onMounted } from "vue";
import {
  loggedUser,
  setLoggedUser,
  clearLoggedUser,
} from "../states/loggedUser.js";

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`;
const API_URL = HOST;

const username = ref("test");
const password = ref("1234#");
const email = ref("test@gmail.com");
const numero_tel = ref("1234567890");

// const loggedUser = ref({})
// const loggedUser = defineProps(['loggedUser'])
const emit = defineEmits(["signup"]);
let done = ref(false);

function signup() {
  fetch(API_URL + "/utente/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username.value, password: password.value, email: email.value, numero_tel: numero_tel.value }),
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      emit("signup", loggedUser);
      done.value = true;
      return;
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here
}
</script>

<template>
  <form>
    <span v-if="!done">
      <input name="username" v-model="username" />
      <input name="password" type="password" v-model="password" />
      <input name="email" v-model="email" />
      <input name="num_tel" v-model="numero_tel" />
      <button type="button" @click="signup">Sign Up</button>
    </span>
    <span v-else>
      <h3>Sign Up completed successfully</h3>
      <p> You can now login </p>
    </span>
  </form>
</template>
