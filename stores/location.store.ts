import type {Store} from "pinia";

type LocationState = {
    hostname: string;
    path: string;
    query: Record<string, any>;
    fragment: string;
}

type LocationGetters = {}

type LocationActions = {
    updateLocation: () => void;
}

export type LocationStoreType = ReturnType<typeof locationStore>;

export const locationStoreKey = "location-key";

export const locationStore = defineStore(
    'location',
    {
        state: () => {
            return {
                hostname: '',
                path: '',
                query: {},
                fragment: '',
            }
        },
        getters: {},
        actions: {
            updateLocation() {
                const hostname = window.location.hostname ?? "";
                const path = window.location.pathname ?? "";
                const fragment = (window.location.hash ?? "").substring(1);
                const queryParams = new URLSearchParams(window.location.search ?? "");
                const query: Record<string, any> = {};
                queryParams.forEach((value, key) => (query[key] = value));

                this.hostname = hostname;
                this.path = path;
                this.query = query;
                this.fragment = fragment;
            }
        },
    });