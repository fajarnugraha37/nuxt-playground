<script setup lang="ts">
import {locationStore, locationStoreKey} from "~/stores/location.store";
import CoreProviderWrapper from "~/stores/CoreProviderWrapper.vue";

</script>

<template>
  <CoreProviderWrapper :storeKey="locationStoreKey" :store="locationStore">
    <slot></slot>
  </CoreProviderWrapper>
</template>
