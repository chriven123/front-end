<script setup>
import RobotInfo from '@/components/RobotInfo.vue'
</script>

<template>
  <main>
    <RobotInfo v-bind:robot_id="$route.params.id"/>
    </main>
</template>