<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-0">
        <v-row class="min-h-screen" no-gutters>

          <!-- LEFT SIDE -->
          <v-col
            cols="12"
            md="6"
            class="d-flex flex-column px-4 px-md-10 pt-6 pt-md-10"
          >
            <Logo class="mx-auto mb-6" />

            <!-- Login -->
            <Login />

            <!-- Footer -->
            <v-footer class="bg-transparent mt-auto">
              <div class="d-flex justify-space-between w-100 text-body-2">
                <span>
                  ICPAK © {{ new Date().getFullYear() }} —
                  <strong>Trainee Accountants Practical Experience Framework</strong>
                </span>
                <span>ICPAK</span>
              </div>
            </v-footer>
          </v-col>

          <!-- RIGHT SIDE (DESKTOP ONLY) -->
          <v-col
            v-if="mdAndUp"
            cols="12"
            md="6"
            class="landing-right d-flex align-center justify-center"
          >
            <div class="text-center text-white px-10">
              <v-img
                :src="landingPageImg"
                max-width="420"
                class="mx-auto mb-6"
              />

              <div class="text-h5 font-weight-medium mb-2">
                Welcome to ICPAK Kuwajibika Index Portal!
              </div>

              <div class="text-body-1 text-white">
                A FRAMEWORK FOR ASSESSING PUBLIC FINANCE MANAGEMENT IN KENYA
              </div>
            </div>
          </v-col>

        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import Logo from '../components/Logo.vue'
import Login from '@/modules/auth/views/Login.vue'
import landingPageImg from '@/assets/landing_page.png'

const { mdAndUp } = useDisplay()
</script>

<style>
.min-h-screen {
  min-height: 100vh;
}

.landing-right {
  background: linear-gradient(135deg, #0f172a, #020617);
}
</style>