<script setup lang="ts">
import {useAuth} from "~/stores";

const auth = useAuth();
const signHandler = (fields: { username: string, password: string}) => {
  const { username, password } = fields;
  auth.doSignIn(username, password);
}

</script>
<template>
  <h1>Blog post {{ $route.params.slug }}</h1>
  <code>{{ auth.error ?? '' }}</code>
  <code>{{ auth.accessToken ?? '' }}</code>
  <code>{{ auth.refreshToken ?? '' }}</code>
  <FormKit type="form" @submit="signHandler">
    <FormKit
        type="text"
        name="username"
        id="username"
        validation="required|not:root"
        label="Username"
        placeholder="Enter your Username"
    />
    <FormKit
        type="password"
        name="password"
        id="password"
        validation="required|not:root"
        label="Password"
        placeholder="Enter your Password"
    />
  </FormKit>
</template>
