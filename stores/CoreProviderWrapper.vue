<script setup lang="ts">
import type {StoreDefinition} from "pinia";
import {singletonProvider} from "~/stores/core";

const { storeKey, store } = defineProps<{
  storeKey: string
  store: StoreDefinition
}>()

singletonProvider(storeKey, store);

</script>

<template>
  <slot></slot>
</template>