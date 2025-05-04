import {defineStore} from 'pinia';

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

export const authStore = defineStore<"auth", AuthState, AuthGetters, AuthActions>('auth', {
    state: () => {
        return {
            // all these properties will have their type inferred automatically
            isAuthenticated: false,
        }
    },
    actions: {
        async doSignIn(username, password, expiresInMins = 30) {
            try {
                this.state = "PENDING";
                const {accessToken, refreshToken} = await fetch(
                    "https://dummyjson.com/auth/login",
                    {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            username: username,
                            password: password,
                            expiresInMins: expiresInMins,
                        }),
                        // credentials: "include",
                    }
                ).then((r) => r.json());

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
            this.accessToken = null;
            this.refreshToken = null;
            this.isAuthenticated = false;
            this.error = null;
        },
        async doRefreshToken() {
            try {
                this.state = "PENDING";
                const {accessToken, refreshToken} = await fetch(
                    "https://dummyjson.com/auth/refresh",
                    {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            refreshToken: this.refreshToken!, // Optional, if not provided, the server will use the cookie
                            expiresInMins: 30, // optional (FOR ACCESS TOKEN), defaults to 60
                        }),
                        credentials: "include", // Include cookies (e.g., accessToken) in the request
                    }
                ).then((res) => res.json());

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
        }
    },
    getters: {},
})

