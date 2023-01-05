<script>
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import {
  loggedUser
} from "../states/loggedUser.js";

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`;
const API_URL = HOST;

export default {
  name: "Trash",
  props: {
    org_name: String,
    plan_id: String
  },
  data() {
    return {
      listTrash: getTrash(this.org_name, this.plan_id),
      zone_id: zone_id
    }
  }
}

const zone_id = ref(0);

function getTrash(name, id) {
  let listTrash = ref([]);
  fetch(API_URL + "/piano_pulizia/organization/" + id, {
    method: "GET",
    headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token }
  })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (json) {
      zone_id.value = json.ID_zona;
      console.log("zone_id: " + zone_id.value)
      fetch(API_URL + "/rifiuto/toclassify?" + new URLSearchParams({ id_zona: json.ID_zona }), {
        method: "GET",
        headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token }
      })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
          console.log(data)
          listTrash.value = data;
        })
        .catch((error) => console.error(error)); // If there is any error you will catch them here
    })
    .catch((error) => console.error(error)); // If there is any error you will catch them here


  console.log(listTrash)
  return listTrash;
}

</script>

<template>
  <div>
    <h1>Rifiuti non riconosciuti ({{ $data.listTrash.length }})</h1>
    <ul>
      <h3 v-if="!Array.isArray($data.listTrash) || !$data.listTrash.length">Non ci sono rifiuti da classificare</h3>
      <li v-else v-for="trash in $data.listTrash" :key="trash">
        <RouterLink :to="'/organisations/' + $props.org_name + '/plans/' + $props.plan_id + '/toclassify/' + trash._id + '?id_zona=' + zone_id">{{ trash._id }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
