// https://vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api

import { reactive } from 'vue'

const userProfile = reactive({
    username: undefined,
    email: undefined,
    numero_tel: undefined,
    ruolo: undefined,
})

function setUserData (data) {
    userProfile.username = data.username;
    userProfile.email = data.email;
    userProfile.numero_tel = data.numero_tel;
    userProfile.ruolo = data.ruolo;
}

function clearUserData () {
    userProfile.username = undefined;
    userProfile.email = undefined;
    userProfile.numero_tel = undefined;
    userProfile.ruolo = undefined;
}

export { userProfile, setUserData, clearUserData }