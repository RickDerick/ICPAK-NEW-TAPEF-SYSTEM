<template>
  <v-container fluid class="pa-0 fill-height">
    <v-row no-gutters class="fill-height">

      <!-- LEFT SIDE -->
      <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-card flat width="100%" max-width="500">
          <v-card-text>
            <!-- Logo -->
            <div class="text-center mb-6">
              <v-img
                :src="companyInformation?.logoFull"
                height="100"
                contain
              />
            </div>
            <router-view />

          </v-card-text>
        </v-card>
      </v-col>

      <!-- RIGHT SIDE -->
      <v-col
        cols="12"
        md="6"
        class="d-none d-md-flex align-center justify-center auth-card text-white"
      >
        <!-- Overlay -->
        <div class="auth-card-opacity"></div>

        <!-- Content -->
        <div class="auth-body text-center px-8">
          <h2 class="mb-4">
            ICPAK | KASNEB
          </h2>

          <p class="mb-6">
            TAPEF system stands for the Trainee Accountants Practical Experience Framework. It is a structured program developed jointly by the Institute of Certified Public Accountants of Kenya (ICPAK) and the Kenya Accountants and Secretaries National Examinations Board (KASNEB).
          </p>

          <!-- Signup Steps -->
          <div v-if="route.name === 'Sign Up'" class="text-left">
            <h4 class="mb-3">
              Follow the steps to create an account:
            </h4>

            <ul>
              <li
                v-for="(item, i) in signupInformation"
                :key="i"
                v-html="item"
              />
            </ul>
          </div>
        </div>
      </v-col>

    </v-row>
    <!-- <VerifyOTP /> -->
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
//import { useStore } from 'vuex'
// import VerifyOTP from './VerifyOTP.vue'
import {ref} from 'vue'



const route = useRoute()
//const store = useStore()
const signupInformation = [
  `Enter a valid email address e.g <strong>email@example.com</strong>.`,
  `Repeat the email address to confirm (<strong>must match</strong>).`,
  `Enter your national ID number.`,
  `Enter a valid phone number.`,
  `Enter a password.`,
  `Confirm your password.`,
  `Check your info.`,
  `Click <strong>Create Account</strong>.`,
  `Receive OTP via SMS.`,
  `Verify using OTP.`,
  `You’ll be redirected to dashboard.`,
]


const companyInformation = ref({
  logoFull: '/images/cpa_logo.png',
  displayName: 'Institute of Certified Public Accountants of Kenya',
})
</script>

<style scoped lang="scss">
.fill-height {
  height: 100vh;
}

/* RIGHT SIDE BACKGROUND */
.auth-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  background-image: url("/images/icpak-launch.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  /* Overlay */
  &-opacity {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000;
    opacity: 0.8;
    z-index: 1;
  }

  /* Content above overlay */
  .auth-body {
    position: relative;
    z-index: 2;
    max-width: 500px;
  }
}

/* Optional mobile tweak */
@media (max-width: 992px) {
  .fill-height {
    height: auto;
  }
}

</style>