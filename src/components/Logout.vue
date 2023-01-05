<script setup>
import { ref, onMounted } from "vue";
import {
  clearLoggedUser,
} from "../states/loggedUser.js";


function logout() {
  clearLoggedUser();
}