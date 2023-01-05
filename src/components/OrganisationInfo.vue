<script>
import { ref, onMounted } from "vue";
import {
    loggedUser
} from "../states/loggedUser.js";

export default {
    name: "OrganisationInfo",
    props: {
        org_name: String,
        org_info: Object
    },
    data () {
        return {
            org_info: getOrganizationInfo(this.org_name)
        }
    }
}

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`;
const API_URL = HOST;

function getOrganizationInfo(name) {
    console.log(name)
    let orgInfo = ref({});
    fetch(API_URL + "/organisation/" + name + "/info", {
        method: "GET",
        headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token }
    })
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (json) {
            orgInfo.value = json.data;
            console.log(orgInfo)
        })
        .catch((error) => console.error(error)); // If there is any error you will catch them here
    
    loggedUser.currentOrganisation = name;
    return orgInfo;
};

</script>

<script setup>

function deleteOrganization(name) {
    console.log("bruh")
    fetch(API_URL + "/organisation/" + name, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "x-access-token": loggedUser.token }
    }).catch((error) => console.error(error)); // If there is any error you will catch them here

    loggedUser.currentOrganisation = undefined;
};

</script>

<template>
    <form>
        <h1>Benvenuto a {{ $data.org_info.name }}</h1>
        <ul>
            <li>Nome: {{ $data.org_info.name }}</li>
            <li>Numero di impiegati: {{ $data.org_info.employee_num }}</li>
        </ul>
        <br>
        <button type="button" @click="deleteOrganization($data.org_info.name)">Elimina organizzazione</button>    
    </form>
</template>
