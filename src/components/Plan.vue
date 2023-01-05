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
      listPlans: getPlans(this.org_name),
      date: null,
    }
  }
}

function getPlans(name) {
  let listPlans = ref([]);
  fetch(API_URL + "/piano_pulizia/list?" + new URLSearchParams({ nome_org: name }), {
    method: "GET",
    headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      listPlans.value = data;
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here

  console.log(listPlans)
  return listPlans;
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
  <div>
    <h1>Piani di pulizia ({{ $data.listPlans.length }})</h1>
    <ul>
      <h3 v-if="!Array.isArray(listPlans) || !listPlans.length">Nessun piano di pulizia</h3>
      <li v-else v-for="plan in $data.listPlans" :key="plan">
        <RouterLink :to="'/organisations/' + $props.org_name + '/plans/' + plan">{{ plan }}</RouterLink>
      </li>
    </ul>
  </div>
  <div>
    <RouterLink :to="'/organisations/' + $props.org_name + '/plans/create'">Crea piano di pulizia</RouterLink>
  </div>
</template>
