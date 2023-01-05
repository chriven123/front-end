<script setup>
import Plan from '@/components/Plan.vue'
</script>

<template>
  <main>
    <Plan v-bind:org_name="$route.params.org_name"/>
    </main>
</template>