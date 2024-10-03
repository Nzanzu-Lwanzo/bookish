import { useSyncExternalStore } from "react";

const subscribe = (callback) => {

    window.addEventListener("online",callback);
    window.addEventListener("offline",callback);

    return ()=> {
        window.removeEventListener("online", callback);
        window.removeEventListener("offline", callback);
    }

}

const getSnapshot = () => navigator.onLine;

export default function useShowNetworkStatus() {

    const isOnline = useSyncExternalStore(subscribe,getSnapshot);

    return {
        element : (
            <span className={`${isOnline ? "cell" : "cell-red"} show-network-status`}>
                { isOnline ? "En ligne" : "Hors ligne"}
            </span>
        )
    }

}