const storageKey = '___dfs___'

export function loadState() {
    console.info('%cLOAD STATE FROM LOCAL STORAGE', 'color: darkgrey; font-weight: bold;');
    try {
        const serializedState = localStorage.getItem(storageKey);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}

export function saveState(state) {
    console.info('%cSAVE STATE TO LOCAL STORAGE', 'color: darkgrey; font-weight: bold;');
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(storageKey, serializedState);
    } catch (err) {
        console.error('ERROR saving state to localStorage', { message: err, state });
    }
}