<script setup>
import Robot from '@/components/Robot.vue'
</script>

<template>
  <main>
    <Robot v-bind:org_name="$route.params.org_name"/>
    </main>
</template>