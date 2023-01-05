<script setup>
import TrashInfo from '@/components/TrashInfo.vue'
</script>

<template>
  <main>
    <TrashInfo v-bind:org_name="$route.params.org_name" v-bind:plan_id="$route.params.plan_id" v-bind:trash_id="$route.params.trash_id" v-bind:zone_id="$route.query.id_zona"/>
    </main>
</template>