<template>
  <v-footer app class="bg-primary text-white">
    <v-container class="d-flex justify-space-between align-center pa-0">

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