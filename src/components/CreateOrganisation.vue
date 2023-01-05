<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import {
  loggedUser
} from "../states/loggedUser.js";

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`;
const API_URL = HOST;

const organization_name = ref("");
const employee_number = ref("");
const warningMessage = ref('')
const successMessage = ref('')

function addOrganisationButton() {
  warningMessage.value = ""
  successMessage.value = ""
  
  addOrganisation(organization_name.value, employee_number.value).catch(err => console.log(err))
}

async function addOrganisation(name, employee_number) {
  let response = await fetch(API_URL + "/organisation", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-access-token': loggedUser.token },
    body: JSON.stringify({ name: name, employee_num: employee_number })
  })

  if (response.ok) {
    successMessage.value = "Organizzazione creata con successo"
  } else {
    warningMessage.value = "Errore nella creazione dell'organizzazione"
  }
}

</script>

<template>
  <form>
    <h1> Crea un'organizzazione </h1>
    <br />
    <div style="float:left;margin-right:20px;">
      <label> Nome organizzazione </label>
      <input v-model="organization_name" placeholder="Nome" />
      <button type="button" @click="addOrganisationButton">Crea organizzazione</button>
    </div>
    <div style="float:left;margin-right:20px;">
      <label> Numero di impiegati </label>
      <input v-model="employee_number" placeholder="0" />
    </div>

    <br />
    <span style="color: red"> {{ warningMessage }} </span>
    <span style="color: white"> {{ successMessage }} </span>
  </form>
</template>
