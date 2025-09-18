import AuthModule from '..'

export default defineNuxtConfig({
    modules: [
        AuthModule as any,
        "@nuxt-alt/http",
        '@nuxt/ui'
    ],
    auth: {
        strategies: {
            discord: {
                clientId: '',
                clientSecret: '',
            }
        }
    },
});
