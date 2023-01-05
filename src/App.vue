<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'

import { loggedUser } from './states/loggedUser';
import { ref, onMounted } from 'vue'

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/EasyLibLogo.jpg" width="100" />

    <div class="wrapper">

      <nav v-if="!loggedUser.token">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/signup">Sign up</RouterLink>
        <RouterLink to="/api/robot">Test robot API</RouterLink>
      </nav>
      <nav v-else-if="!loggedUser.currentOrganisation">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/profile">Profilo</RouterLink>
        <RouterLink to="/organisations">Le mie organizzazioni</RouterLink>
        <RouterLink v-if="loggedUser.ruolo == 'admin'" to="/robots/create">Crea robot</RouterLink>
        <RouterLink to="/logout">Logout</RouterLink>
      </nav>
      <nav v-else-if="!loggedUser.currentPlan">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink :to="'/organisations/' + loggedUser.currentOrganisation + '/robots'">Elenco robot</RouterLink>
        <RouterLink :to="'/organisations/' + loggedUser.currentOrganisation + '/plans'">Piani di puliza</RouterLink>
      </nav>
      <nav v-else>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink :to="'/organisations/' + loggedUser.currentOrganisation + '/plans/' + loggedUser.currentPlan + '/toclassify'">Rifiuti non riconosciuti</RouterLink>
      </nav>

      
    </div>

    
  </header>
  
 

  
  <body>
  <ul class="bg-bubbles">
    
		    <li></li>
		    <li></li>
		    <li></li>
		    <li></li>
		    <li></li>
		    <li></li>
		    <li></li>
		    <li></li>
		    <li></li>
		    <li></li>
	</ul><RouterView /></body>
</template>

<style>
@import '@/assets/base.css';
header{position: relative;
  left:0%;
width: auto;}
html{position: relative;
  
  overflow: hidden;
  background: linear-gradient(to bottom right, #1e64c0 0%, #e00cd6 100%);
}
main {
  
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
}

#app {

  position: relative;

  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
 

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: rgba(255, 73, 234, 0.826);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(246, 61%, 43%, 0.742);
  }
}

nav {
  width: auto;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {



  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: rigth;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
.bg-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.bg-bubbles li {
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
  bottom: -160px;
  -webkit-animation: square 25s infinite;
  animation: square 25s infinite;
  transition-timing-function: linear;
}
.bg-bubbles li:nth-child(1) {
  left: 10%;
}
.bg-bubbles li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  -webkit-animation-delay: 2s;
          animation-delay: 2s;
  -webkit-animation-duration: 17s;
          animation-duration: 17s;
}
.bg-bubbles li:nth-child(3) {
  left: 25%;
  -webkit-animation-delay: 4s;
          animation-delay: 4s;
}
.bg-bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  -webkit-animation-duration: 22s;
          animation-duration: 22s;
  background-color: rgba(255, 255, 255, 0.25);
}
.bg-bubbles li:nth-child(5) {
  left: 70%;
}
.bg-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  -webkit-animation-delay: 3s;
          animation-delay: 3s;
  background-color: rgba(255, 255, 255, 0.2);
}
.bg-bubbles li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 7s;
          animation-delay: 7s;
}
.bg-bubbles li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  -webkit-animation-delay: 15s;
          animation-delay: 15s;
  -webkit-animation-duration: 40s;
          animation-duration: 40s;
}
.bg-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  -webkit-animation-delay: 2s;
          animation-delay: 2s;
  -webkit-animation-duration: 40s;
          animation-duration: 40s;
  background-color: rgba(255, 255, 255, 0.3);
}
.bg-bubbles li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 11s;
          animation-delay: 11s;
}
@-webkit-keyframes square {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-700px) rotate(600deg);
  }
}
@keyframes square {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-700px) rotate(600deg);
  }
}
form input {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  outline: 0;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.2);
  width: 250px;
  border-radius: 3px;
  padding: 10px 15px;
  margin: 0 auto 10px auto;
  display: block;
  text-align: center;
  font-size: 14px;
  color: white;
  transition-duration: 0.25s;
  font-weight: 30;
}
form input:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
form input:focus {
  background-color: white;
  width: 300px;
  color: #1e64c0;
}
form input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}
form button {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  outline: 0;
  background-color: white;
  color: #1e64c0;
  width: 250px;
  border-radius: 3px;
  padding: 10px 15px;
  margin: 0 auto 10px auto;
  display: block;
  text-align: center;
  font-size: 14px;
  transition-duration: 0.25s;
  font-weight: 30;
}
form button:hover {
  background-color: #f5f7f9;
}
button {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  outline: 0;
  background-color: white;
  color: #1e64c0;
  width: 250px;
  border-radius: 3px;
  padding: 10px 15px;
  margin: 0 auto 10px auto;
  display: block;
  text-align: center;
  font-size: 14px;
  transition-duration: 0.25s;
  font-weight: 30;
}
button:hover {
  background-color: #f5f7f9;
}
input, label {
  display: inline-block;
}

</style>
