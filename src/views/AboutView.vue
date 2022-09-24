<template>
  <HelloWorld :msg="msg" />
  {{ bugNumber[0] }}
  <button @click="increment()">增加</button>

  {{ counter }}
  <button @click="incrementCounter()">+1</button>
</template>

<script setup lang="ts">
  import { ref, toRefs, watch } from 'vue'
  import HelloWorld from '@/components/HelloWorld.vue'
  import useStore from '../stores'
  import { storeToRefs } from 'pinia'

  const { counters } = useStore()

  const { increment, incrementCounter } = counters
  const { counter, list } = storeToRefs(counters)

  const bugNumber = toRefs(list.value.map((item) => item.bugNum))

  console.log('bugNumber :>> ', bugNumber[0])

  const msg = ref('hello world112223121')
</script>

<style scoped></style>
