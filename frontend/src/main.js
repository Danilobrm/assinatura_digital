import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import LottieVuePlayer from '@lottiefiles/vue-lottie-player'

// Vue.use(LottieVuePlayer)

const app = createApp(App)
app.use(router)

app.mount('#app')