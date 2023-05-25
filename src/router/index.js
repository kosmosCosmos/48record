import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import M3u8View from '../views/m3u8.vue'
import Mp4View from '../views/mp4.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/m3u8',
            name: 'm3u8',
            component: M3u8View
        },
        {
            path: '/mp4',
            name: 'mp4',
            component: Mp4View
        },
    ]
})

export default router