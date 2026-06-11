import {defineStore} from 'pinia';
import AuthService from '@/modules/auth/AuthService'
import constants from '@/stores/constants';
import call from '@/services';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        loading: false,
        otpModal: false,
        passwordSetSuccess: false,
        forgotOtp: false,
    }),
    getters: {
    authStoreGetters: (state) => (key) => state[key],
  },
    actions: {
        setPasswordSetSuccess(status) {
      this.passwordSetSuccess = status;
    },
    openforgotOtp(payload) {
      this.$patch({
        forgotOtp: payload,
      });
    },
    // OTP request
    openOtp(payload) {
      this.$patch({
        otpModal: payload,
      });
    },

    resetPassword(data) {
      this.loading = true;
      call("post", constants.resetPassword, data)
        .then((res) => {
          this.loading = false;
          if (res?.data?.data?.token) {
            AuthService.login(res.data.data.token, res.data.data.user);
            this.toast.success(res.data?.data?.message || 'Password reset successful', { autoClose: 3000 });
            const role = res.data?.data?.user?.role;
            const routeName = role === 'is_admin' ? 'AdminDashboard' : (role === 'reviewer' ? 'ReviewerDashboard' : 'Dashboard');
            setTimeout(() => {
              this.router.push({ name: routeName });
            }, 1000);
          } else {
            this.toast.success(res.data?.data?.message || 'Password reset successful', { autoClose: 3000 });
            setTimeout(() => {
              this.router.push({ name: "Login" });
            }, 500);
          }
        })
        .catch((err) => {
          this.toast.error(err?.response?.data?.message);
          this.loading = false;
        });
    },

    register(data) {
      this.loading = true;
      call("post", constants.register, data)
        .then((res) => {
          this.loading = false;
          this.toast.success(res.data.message);
          this.openOtp(true);
        })
        .catch((err) => {
          this.loading = false;
          this.toast.error(err?.response?.data?.message);
        });
    },

    login(data) {
      this.loading = true;
      call("post", constants.login, data)
        .then((res) => {
          if (res.data.message === "Success") {
            AuthService.login(res.data.data.token, res.data.data.user);
            setTimeout(()=>{
              this.toast.success("Login successful");
            },500);
            this.loading = false;
            const role = res.data?.data?.user?.role;
            const routeName = role === 'is_admin' ? 'AdminDashboard' : (role === 'reviewer' ? 'ReviewerDashboard' : 'Dashboard');
            this.router.push({ name: routeName });
          } else {
            if (res.data.message === "error") {
              this.toast.error(res?.data?.email[0]);
              this.loading = false;
            }
          }
        })
        .catch((err) => {
          this.loading = false;
          this.toast.error(err?.response?.data?.message);
        });
    },

    sendOtp(data) {
      this.loading = true;
      call("post", constants.sendOtp, data)
        .then((res) => {
          this.toast.success(res.data.message);
        })
        .catch((err) => {
          this.loading = false;
          this.toast.error(err?.response?.data?.message);
        });
    },

    forgotPassword(data) {
      this.loading = true;
      call("post", constants.forgotPassword, data)
        .then((res) => {
          this.loading = false;
          setTimeout(()=>{
            this.toast.success(res.data?.data?.message || "Reset link has been sent to your email");
          },500);
          this.router.push({ name: "Login" });
        })
        .catch((err) => {
          this.loading = false;
          this.toast.error(err?.response?.data?.message);
        });
    },

     verifyforgotOtp(data) {
      this.loading = true;
      call("post", constants.verifyForgotOtp, data)
        .then((res) => {
          this.loading = false;
          this.toast.success("OTP successfully verified");
          this.router.push({ name: "setPassword" });
        })
        .catch((err) => {
          this.loading = false;
          this.toast.error(err?.response?.data?.message);
        });
    },

    verifyOtp(data) {
      this.loading = true;
      call("post", constants.verifyOtp, data)
      .then((res)=>{
        this.loading = false;
        AuthService.login(res.data.data.token, res.data.data.user);
        this.router.push({ name: "Login" });
      })
      .catch((err) => {
        this.loading = false;
        this.toast.error(err?.response?.data?.message);
      });
    },


    }
});