import AuthModule from '..'

export default defineNuxtConfig({
    modules: [
        AuthModule as any,
        "@nuxt-alt/http",
    ],
    auth: {
        strategies: {
        }
    },
});
