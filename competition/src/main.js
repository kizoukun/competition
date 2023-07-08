import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeftLong, faTrain, faBus, faSubway, faCirclePlus, faCreditCard } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowLeftLong, faTrain, faBus, faSubway, faCirclePlus, faCreditCard);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app')
