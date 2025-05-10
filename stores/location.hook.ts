import {locationStoreKey, type LocationStoreType} from "~/stores/location.store";
import {useProvider} from "~/stores/core";

export const useLocation = () => useProvider<LocationStoreType>(locationStoreKey);
