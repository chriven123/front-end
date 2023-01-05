<script setup>
import CreatePlan from '@/components/CreatePlan.vue'
</script>

<template>
  <main>
    <CreatePlan v-bind:org_name="$route.params.org_name"/>
    </main>
</template>