<template>
  <div>
    {{ env }}
    <br>
    {{ url }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const env = ref(import.meta.env.VITE_PORT);
const url = ref(import.meta.env.BASE_URL)
</script>

<style scoped>
</style>
