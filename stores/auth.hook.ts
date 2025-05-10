import {useProvider} from "~/stores/core";
import {authStoreKey, type AuthStoreType} from "~/stores/auth.store";

export const useAuth = () => useProvider<AuthStoreType>(authStoreKey);
