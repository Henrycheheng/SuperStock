<template>
  <div @click="handleClick">click</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'MyComponent',
    components: {},
    props: {},
    setup() {
      const handleClick = () => {}

      return {
        handleClick,
      }
    },
  })

  /*
      编译器的实现
    */

  /* render() {
    return {
        h('div', {onclick: handleClick}, 'click')
      }
    } */
</script>

<style scoped lang="scss"></style>
