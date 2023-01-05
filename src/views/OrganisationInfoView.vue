<script setup>
import OrganisationInfo from '@/components/OrganisationInfo.vue'
</script>

<template>
  <main>
    <OrganisationInfo v-bind:org_name="$route.params.org_name" />
    </main>
</template>
