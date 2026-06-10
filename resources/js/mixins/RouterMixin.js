export function encodeRoute(param) {
    try {
        return btoa(String(param));
    } catch (e) {
        return String(param);
    }
}

export function decodeRoute(param) {
    try {
        return atob(String(param));
    } catch (e) {
        return String(param);
    }
}

export default { encodeRoute, decodeRoute };