<script setup>
const message = ref('Nuxt')
const hello = () => sayHello(message.value)
const {data} = await useFetch('/api/hello')

</script>

<template>
  <UButton>Button</UButton>
  <h1>Demo with auto imports {{ data.message }}</h1>
  <form @submit.prevent="hello">
    <MyInput v-model="message"/>
    <button type="submit">Say Hello</button>
  </form>
  <NuxtLink to="/blog/hello-world">
    Go to blog post
  </NuxtLink>
</template>
