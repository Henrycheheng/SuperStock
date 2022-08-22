<script setup lang='ts'>
import { useCounterStore } from "@/stores/counter";
const counter = useCounterStore
</script>


<template>
  <div class="about">
    <h1>{{ counter }}</h1>
  </div>
</template>


<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>