<script>
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import Datepicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'
import {
  loggedUser
} from "../states/loggedUser.js";

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`;
const API_URL = HOST;

export default {
  name: "Plan",
  props: {
    org_name: String
  },
  components: { Datepicker },
  data() {
    return {
      org_name: this.org_name,
      date: null,
    }
  }
}

</script>

<script setup>

const zone_id = ref("");
const warningMessage = ref('')
const successMessage = ref('')

function createPlanButton(org, start_date, end_date) {
  warningMessage.value = ""
  successMessage.value = ""

  createPlan(org, start_date, end_date).catch(err => console.log(err))
}

async function createPlan(org, start_date, end_date) {
  let response = await fetch(API_URL + "/piano_pulizia", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-access-token': loggedUser.token },
    body: JSON.stringify({
      id_zona: zone_id.value,
      data_inizio: start_date,
      data_fine: end_date,
      nome_organizzazione: org
    })
  })

  if (response.ok) {
    let json = await response.json();
    console.log(json);

    successMessage.value = 'Piano di pulizia creato con successo'
  } else {
    if (response.status == 404) {
      warningMessage.value = "Zona non trovata"
    } else {
      warningMessage.value = "Errore sconosciuto"
    }
  }
}

</script>

<template>
  <form>
    <h1> Crea un piano di pulizia </h1>
    <br />
    <div style="float:left;margin-right:20px;">
      <label> Zona </label>
      <input v-model="zone_id" placeholder="ID" />
      <button type="button" @click="createPlanButton($props.org_name, $data.date[0], $data.date[1])">Crea piano di pulizia</button>
    </div>
    <div style="float:left;margin-right:20px;">
      <label> Durata del piano </label>
      <Datepicker v-model="date" range></Datepicker>
    </div>

    <br />
    <span style="color: red"> {{ warningMessage }} </span>
    <span style="color: white"> {{ successMessage }} </span>
  </form>
</template>
