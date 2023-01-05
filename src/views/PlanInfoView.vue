<script setup>
import PlanInfo from '@/components/PlanInfo.vue'
</script>

<template>
  <main>
    <PlanInfo v-bind:org_name="$route.params.org_name" v-bind:plan_id="$route.params.id"/>
    </main>
</template>