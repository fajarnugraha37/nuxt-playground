<script setup lang="ts">
import AuthProvider from "~/stores/AuthProvider.vue";
</script>

<template>
  <AuthProvider>
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </header>
    <main>
      <slot/>
    </main>
    <footer>
    </footer>
  </AuthProvider>
</template>