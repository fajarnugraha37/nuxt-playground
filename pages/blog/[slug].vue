<script setup lang="ts">
import {useAuth} from "~/stores";

const auth = useAuth();
</script>
<template>
  <h1>Blog post {{ $route.params.slug }}</h1>
  <button @click="() => auth.doSignIn('', '')">login</button>
  {{ auth.error }}
</template>
