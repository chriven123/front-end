<script setup>
import AddRobot from '@/components/AddRobot.vue'
</script>

<template>
  <main>
    <AddRobot v-bind:org_name="$route.params.org_name"/>
    </main>
</template>