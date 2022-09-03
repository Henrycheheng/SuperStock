<template>
  <div>
    {{ env }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const env = ref(import.meta.env.VITE_PORT);
</script>

<style scoped>
</style>
