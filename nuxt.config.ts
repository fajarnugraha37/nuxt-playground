// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},

    modules: [
        '@nuxt/fonts',
        '@nuxt/icon',
        '@nuxt/image',
        '@nuxt/content',
        '@nuxt/ui',
        '@nuxt/scripts',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
    ],
    css: ['~/assets/css/main.css'],
    pinia: {
        storesDirs: [
            './stores/**',
        ],
    },
    ui: {
        theme: {
            transitions: true
        }
    },
    routeRules: {
        '/**': {
            cors: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        }
    }
})