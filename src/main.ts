import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '/@/design/index.less'

/* 我们传入 createApp 的对象实际上是一个组件，每个应用都需要一个“根组件”，其他组件将作为其子组件。 */
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
