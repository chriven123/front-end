// https://vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api

import { reactive } from 'vue'

const loggedUser = reactive({
    token: undefined,
    username: undefined,
    ruolo: undefined,
    currentOrganisation: undefined,
    currentPlan: undefined,
    currentTrash: undefined,
})

function setLoggedUser (data) {
    loggedUser.token = data.token;
    loggedUser.username = data.username;
}

function clearLoggedUser () {
    loggedUser.token = undefined;
    loggedUser.username = undefined;
}

export { loggedUser, setLoggedUser, clearLoggedUser } 