<template>
  <v-container
    fluid
    class="fill-height d-flex flex-row align-center"
    style="background-color: var(--v-theme-gray);"
  >
    <v-row class="w-100" justify="center" align="center">
      <v-col cols="12" md="12">
        <v-card
          class="login-card rounded-lg"
          elevation="8"
          style="background-color: var(--v-theme-white);"
        >
          <div class="text-center mb-6">
           

            <h3
              class="text-h3 font-weight-bold mb-2"
              style="color: var(--v-theme-primary);"
            >
              Welcome Back!
            </h3>

            <p
              class="text-subtitle-2 px-2 px-sm-4"
              style="color: var(--v-theme-black);"
            >
              For Supervisors Enter your email address or Member No to access your account.
            </p>
          </div>

          <v-form
            ref="loginForm"
            v-model="isValid"
            @submit.prevent="login"
          >
            <v-text-field
              v-model="formData.email"
              label="Email address"
              type="email"
              density="comfortable"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              placeholder="Email address"
              persistent-placeholder
              :rules="rules.email"
              class="mb-2"
              style="background-color: var(--v-theme-gray);"
              @keyup.enter.prevent="login"
            />

            <v-text-field
              v-model="formData.password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              density="comfortable"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
              variant="outlined"
              placeholder="Password"
              persistent-placeholder
              :rules="rules.required"
              class="mb-2"
              style="background-color: var(--v-theme-gray);"
              @keyup.enter.prevent="login"
            />

            <div class="d-flex justify-end mb-2">
              <v-btn
                variant="text"
                class="text-decoration-underline px-0"
              >
                Forgot password?
              </v-btn>
            </div>

            <v-card-actions class="pa-0 flex-column align-stretch">
              <v-btn
                color="primary"
                block
                variant="elevated"
                class="font-weight-bold text-white mb-3"
                @click="login"
              >
                Login
              </v-btn>

              <p class="text-center mb-3" style="color: var(--v-theme-black);">
                Don’t have an account?
              </p>

              <v-btn
                color="primary"
                block
                variant="outlined"
                class="font-weight-bold"
                :to="{ name:'RegLanding'}"
              >
                Register
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue';
//import { useAuthStore } from '@/stores/auth';
//import Logo from '../components/Logo.vue';

//const authStore = useAuthStore();

const isValid = ref(false);
const showPassword = ref(false);
const loginForm = ref(null);

const formData = reactive({
  email: '',
  password: '',
  token: '',
});

const rules = {
  email: [
    (value) => !!value || 'Email address is required.',
    (value) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || 'Invalid e-mail.';
    },
  ],
  required: [(value) => !!value || 'Required.'],
};

async function login() {
  if (!loginForm.value) return;

  const result = await loginForm.value.validate();
  if (result.valid) {
    authStore.login(formData);
  }
}
</script>

<style scoped>
.login-card {
  padding: 16px;
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 600px) {
  .login-card {
    padding: 12px;
    max-width: 360px;
  }
}

/* Tighten common margin utilities inside the card to reduce height */
.login-card .mb-6 { margin-bottom: 12px !important; }
.login-card .mb-4 { margin-bottom: 8px !important; }
.login-card .mb-3 { margin-bottom: 6px !important; }
.login-card h3, .login-card h4 { margin-bottom: 6px !important; }
</style>