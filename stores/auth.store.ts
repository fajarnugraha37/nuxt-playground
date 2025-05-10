import {FetchError} from "ofetch";

type AuthState = {
    accessToken?: string | null;
    refreshToken?: string | null;
    isAuthenticated: boolean;
    error?: unknown | null;
    state?: "PENDING" | "DONE" | null;
}

type AuthGetters = {}

type AuthActions = {
    doSignIn: (username: string, password: string, expiresInMins?: number) => Promise<void>;
    doRefreshToken: () => Promise<void>;
    doSignOut: () => Promise<void>;
}

export type AuthStoreType = ReturnType<typeof authStore>;

export const authStoreKey = "auth-store";

export const authStore = defineStore<
    "auth",
    AuthState,
    AuthGetters,
    AuthActions
>(
    'auth',
    {
        state: () => {
            return {
                // all these properties will have their type inferred automatically
                isAuthenticated: false,
            }
        },
        getters: {},
        actions: {
            async doSignIn(username, password, expiresInMins = 30) {
                try {
                    this.state = "PENDING";
                    const {accessToken, refreshToken} = await $fetch<{
                        accessToken: string;
                        refreshToken: string;
                    }>(
                        "https://dummyjson.com/auth/login",
                        {
                            method: 'POST',
                            body: {
                                username: username,
                                password: password,
                                expiresInMins: expiresInMins,
                            },
                            headers: {
                                "Content-Type": "application/json",
                            },
                            responseType: 'json',
                        });

                    this.accessToken = accessToken;
                    this.refreshToken = refreshToken;
                    this.isAuthenticated = true;
                    this.error = null;
                } catch (error) {
                    this.error = error;
                    this.isAuthenticated = false;
                } finally {
                    this.state = "DONE";
                }
            },
            async doSignOut() {
                this.$reset();
            },
            async doRefreshToken() {
                try {
                    this.state = "PENDING";
                    const {accessToken, refreshToken} = await $fetch<{
                        accessToken: string;
                        refreshToken: string;
                    }>(
                        "https://dummyjson.com/auth/refresh",
                        {
                            method: 'POST',
                            body: {
                                refreshToken: this.refreshToken!, // Optional, if not provided, the server will use the cookie
                                expiresInMins: 30, // optional (FOR ACCESS TOKEN), defaults to 60
                            },
                            headers: {
                                "Content-Type": "application/json",
                            },
                            credentials: "include", // Include cookies (e.g., accessToken) in the request
                            responseType: 'json'
                        });

                    this.accessToken = accessToken;
                    this.refreshToken = refreshToken;
                    this.isAuthenticated = true;
                    this.error = null;
                } catch (error) {
                    this.error = error;
                    this.isAuthenticated = false;
                } finally {
                    this.state = "DONE";
                }
            },
        },
    });

