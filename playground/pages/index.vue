<template>
    <div>
        <pre>{{ auth.user }}</pre>
    </div>
</template>

<script lang="ts" setup>
const { $auth } = useNuxtApp()
const auth = useAuth()
console.log(auth)
console.log($auth)
</script>