import axios from "axios";
import { apiBaseUrl } from "@/environment";
import AuthService from "@/modules/auth/AuthService";

/**
 * Axios basic configuration
 * IMPORTANT: Do NOT set a global Content-Type.
 * - For JSON requests we set it per-request in interceptor.
 * - For FormData we let the browser set multipart/form-data boundary automatically.
 */
const config = {
  baseURL: apiBaseUrl,
  headers: {
    Accept: "application/json",
    // Content-Type intentionally omitted
  },
};

/**
 * Creating the instance of Axios
 */
const client = axios.create(config);

/**
 * Auth + Content-Type interceptor
 * - Adds Bearer token
 * - Sets JSON Content-Type only when payload is NOT FormData
 */
const authInterceptor = (config) => {
  if (!config) return config;

  // Ensure headers object exists
  config.headers = config.headers || {};

  // Add Bearer token if user is logged in
  if (AuthService.check()) {
    config.headers.Authorization = `Bearer ${AuthService.token}`;
  }

  // Detect FormData
  const isFormData =
    typeof FormData !== "undefined" && config.data instanceof FormData;

  /**
   * If NOT FormData:
   * - set JSON content type (unless caller already set it)
   * If FormData:
   * - remove any Content-Type so browser sets boundary
   */
  if (isFormData) {
    // Let the browser set multipart/form-data; boundary=...
    delete config.headers["Content-Type"];
    delete config.headers["content-type"];
  } else {
    // Only set if not already explicitly set
    if (!config.headers["Content-Type"] && !config.headers["content-type"]) {
      config.headers["Content-Type"] = "application/json";
    }
  }

  return config;
};

/**
 * Logger interceptor
 */
const loggerInterceptor = (config) => {
  if (!config) return config;

  const fullUrl = config.baseURL
    ? config.baseURL.replace(/\/$/, "") +
      "/" +
      (config.url || "").replace(/^\//, "")
    : config.url;

  // console.log('[API REQUEST]', config.method?.toUpperCase(), fullUrl, config.data || '');
  return config;
};

client.interceptors.request.use(authInterceptor);
client.interceptors.request.use(loggerInterceptor);

/**
 * Response interceptor
 */
client.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle Unauthenticated (401)
    if (error.response && error.response.status === 401) {
      AuthService.logout();
    }

    let message = "An unexpected error occurred";

    if (error.response && error.response.data) {
      message = error.response.data.message || message;

      if (
        typeof message === "string" &&
        message.length > 160 &&
        message.includes("code :")
      ) {
        try {
          const cleanMsg = JSON.parse(message.split("code :").pop());
          message = cleanMsg.error?.message || message;
        } catch (e) {
          console.error("Failed to parse error JSON", e);
        }
      }

      error.response.data.message = message;
    }

    return Promise.reject(error);
  }
);

export default client;