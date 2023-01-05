<script setup>
import Trash from '@/components/Trash.vue'
</script>

<template>
  <main>
    <Trash v-bind:org_name="$route.params.org_name" v-bind:plan_id="$route.params.id"/>
    </main>
</template>