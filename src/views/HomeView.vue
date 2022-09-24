<template>
  <a-space>
    <a-select
      v-model:value="province"
      style="width: 120px"
      :options="provinceData.map((pro) => ({ value: pro }))"
    >
    </a-select>
    <a-select
      v-model:value="secondCity"
      style="width: 120px"
      :options="cities.map((city) => ({ value: city }))"
    >
    </a-select>
  </a-space>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs, computed, watch } from 'vue'
  const arr = [
    {
      projectId: 'console-framework',
      version: ['22.5.0', '22.6.0'],
    },
    {
      projectId: 'cf-ui',
      version: ['乌兰查布', '乌兰查布'],
    },
  ]

  const provinceData = arr.map((item) => item.projectId)
  // const provinceData = ['Zhejiang', 'Jiangsu'];
  console.log('provinceData :>> ', provinceData)

  const versionStr = arr.map((item) => item.version)
  const cityData = {
    'console-framework': [...versionStr][0],
    'cf-ui': [...versionStr][1],
  }

  console.log('cityData :>> ', cityData)

  // const cityData = {
  //   Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  //   Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
  // };

  export default defineComponent({
    setup() {
      const province = provinceData[0]
      const state = reactive({
        province,
        provinceData,
        cityData,
        secondCity: cityData[province][0],
      })
      const cities = computed(() => {
        return cityData[state.province]
      })
      watch(
        () => state.province,
        (val) => {
          state.secondCity = state.cityData[val][0]
        }
      )
      return { ...toRefs(state), cities }
    },
  })
</script>
