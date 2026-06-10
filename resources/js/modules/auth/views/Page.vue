<template>
  <v-app>
    <v-app-bar color="primary">
      <v-container class="d-flex align-center">
      <v-img
        :src="companyInformation.IcpakLogo"
        max-height="50"
        max-width="180"
        contain
        class="mr-4"
      />

    <!-- Vertical divider -->
    <div class="d-flex align-center logos-pair">
      <v-divider vertical class="mx-3 divider-white" />

      <v-img
        :src="company2Information.KasnebLogo"
        max-height="50"
        max-width="180"
        width="120"
        contain
        alt="partner logo"
        class="ml-0"
      />
    </div>

    <v-spacer />

    <v-btn variant="text" to="/search" class="text-white">Search</v-btn>
    <v-btn variant="text" to="/" class="text-white">Home</v-btn>

    <span class="ml-4 text-white">Welcome</span>
    </v-container>
    </v-app-bar>

    <!--MAIN CONTENT -->
    <v-main class="page-main">
      <v-container class="pt-2">
          <router-view />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Footer from '@/components/Footer.vue'
//import { useStore } from 'vuex'
// import VerifyOTP from './VerifyOTP.vue'
import {ref} from 'vue'



const route = useRoute()
//const store = useStore()

const companyInformation = ref({
  IcpakLogo: '/images/cpa_logo.png',
  displayName: 'Institute of Certified Public Accountants of Kenya',
})

const company2Information = ref({
  KasnebLogo: '/images/kasneb-logo.png',
  displayName: 'Kasneb',
  })

const role = ref('Trainee')

</script>

<style scoped lang="scss">
.fill-height {
  min-height: calc(100vh - 64px); 
}

/* Optional mobile tweak */
@media (max-width: 992px) {
  .fill-height {
    height: auto;
  }
  
  .divider-white {
    background-color: rgba(255,255,255,0.6) !important;
    width: 1px !important;
    height: 36px !important;
  }
  
  .logos-pair {
    align-items: center;
  }

  .page-main {
    padding-bottom: 80px; /* room for fixed footer (72px) + small gap */
  }

  /* tighten gap under the app bar */
  .page-main .v-container {
    padding-top: 8px !important;
  }
}

</style>