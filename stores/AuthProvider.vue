<script setup lang="ts">
import {authStore, authStoreKey} from "~/stores/auth.store";
import CoreProviderWrapper from "~/stores/CoreProviderWrapper.vue";

</script>

<template>
  <CoreProviderWrapper :storeKey="authStoreKey" :store="authStore">
    <slot></slot>
  </CoreProviderWrapper>
</template>
