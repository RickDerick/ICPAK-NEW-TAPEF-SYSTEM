<template>
  <v-footer class="bg-primary text-white fixed-footer">
    <v-container class="d-flex justify-space-between align-center pa-3">

      <div v-if="company">
        <a
          :href="company.website"
          target="_blank"
          class="text-white text-decoration-none"
        >
          {{ company.displayName }}
        </a>
        <span class="ml-1">
          &copy; {{ year }}.
        </span>
      </div>

      <div>
        <span class="mr-1">Developed by</span>
        <a
          href="https://kinetics.co.ke"
          target="_blank"
          class="text-white text-decoration-none"
        >
          ICPAK
        </a>
      </div>

    </v-container>
  </v-footer>
</template>

<script setup>
import { computed, ref } from 'vue'

const company = ref({
  id: 1,
  displayName: 'ICPAK',
  website: 'https://www.icpak.com/',
})

const year = computed(() => new Date().getFullYear())
</script>

<style scoped>
.fixed-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 72px;
  z-index: 1400;
}

.fixed-footer .v-container {
  height: 100%;
  display: flex;
  align-items: center;
}

/* Safe area support for iOS */
.fixed-footer {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>