<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="100%" max-width="700" elevation="3" class="pa-6">
      <!-- Title -->
      <div class="text-center mb-6">
        <h1>
          Choose the Category Below and Apply
        </h1>

        <p class="text-medium-emphasis mt-2">
          Select the category that best describes you to begin your application.
        </p>
      </div>

      <!-- Category Cards -->
      <v-row>
        <v-col cols="12" md="6">
          <v-card variant="outlined" class="category-card pa-4 h-100 d-flex flex-column justify-space-between">
            <div>
              <div class="category-title mb-3 text-center text-h5">
                Trainee
              </div>

              <ul class="instruction-list">
                <li>
                  Trainee accountant is eligible to commence the practical experience requirements as soon as
                  he/she has registered for his/her first CPA exam paper with kasneb.
                </li>
              </ul>
            </div>

            <v-card-actions class="justify-center">
              <v-btn color="primary"
                         block 
                        variant="elevated"
                        class="font-weight-bold text-white"
                        @click="apply('trainee')">Apply</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card variant="outlined" class="category-card pa-4 h-100 d-flex flex-column justify-space-between">
            <div>
              <div class="category-title mb-3 text-center text-h5">
                Supervisor
              </div>

              <ul class="instruction-list">
                <li>
                  You must be a member of ICPAK in good standing or a member of an IFAC registered body.
                </li>
              </ul>
            </div>

            <v-card-actions class="justify-center">
              <v-btn color="primary" 
                        block 
                        variant="elevated"
                        class="font-weight-bold text-white"
                        @click="apply('supervisor')"
                >Apply</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function apply(category) {
  router.push({ name: 'Signup', params: { category } })
}
</script>

<style scoped>
.fill-height {
  min-height: calc(100vh - 64px);
}

.category-card {
  border-radius: 12px;
}

.category-title {
  font-weight: 600;
}

.instruction-list {
  padding-left: 20px;
  margin: 0;
}

.instruction-list li {
  margin-bottom: 12px;
  color: rgba(0, 0, 0, 0.7);
}
</style>