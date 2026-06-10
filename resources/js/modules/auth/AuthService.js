import { toast } from "vue3-toastify";
import { normalizeProfilePicture } from '@/mixins/profile'

class AuthService {
    constructor() {
        this.token = localStorage.getItem("wajibika_token");

        const user = localStorage.getItem("wajibika_user");

        if (user && user !== "undefined") {
            this.user = JSON.parse(user);
        } else {
            this.user = null;
        }
    }

    check() {
        return !!this.token;
    }

    setUser(user) {
        const normalized = normalizeProfilePicture(user)
        localStorage.setItem("wajibika_user", JSON.stringify(normalized));
        this.user = normalized;
    }

    login(token, user) {
        const normalizedLoginUser = normalizeProfilePicture(user)

        localStorage.setItem("wajibika_token", token);
        localStorage.setItem("wajibika_user", JSON.stringify(normalizedLoginUser));
        this.token = token;
        this.user = normalizedLoginUser;
    }

    logout() {
        localStorage.removeItem("wajibika_token");
        localStorage.removeItem("wajibika_user");
        toast.success("Logout successful");
        setTimeout(() => {
            window.location = "/";
        }, 500);
    }
}

export default new AuthService();
