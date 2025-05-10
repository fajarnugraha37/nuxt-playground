import {inject, provide} from "vue";
import type {StoreDefinition} from "pinia";

export function useProvider<T>(key: string): T {
    const context = inject<T| null>(key, null);
    if (!context)
        throw new Error('store must be used within a provider');
    return context;
}

export function singletonProvider<T extends StoreDefinition>(key: string, storeDefinition: T): void {
    const context = inject<T | null>(key, null);
    if (context == null) {
        provide<T>(key, storeDefinition());
    }
}