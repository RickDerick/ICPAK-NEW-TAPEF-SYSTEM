<template>
  <v-container fluid class="fill-height d-flex align-center justify-center">
    <v-row justify="center" class="ma-0">
      <v-col md="6" sm="12">
        <v-card>
            <v-card-title v-if="isTrainee" class="d-flex flex-row justify-center font-weight-gray">
              REGISTER
            </v-card-title>
           
            <v-card-text class="text-justify mt-4 pb-0">
              <template v-if="isSupervisor">
                <v-row no-gutters class="mb-3" align="center">
                  <v-col cols="9" class="pr-2">
                    <v-text-field
                      density="compact"
                      variant="outlined"
                      label="Member No"
                      placeholder="Enter member number"
                      v-model="memberNo"
                      hide-details
                      dense
                    />
                  </v-col>
                  <v-col cols="3" class="pl-2 d-flex align-center">
                    <v-btn color="primary" class="ma-0" @click="searchMember" block dark>
                      <v-icon color="white">mdi-magnify</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>

              <v-row no-gutters>
              <v-col cols="12" md="12">
                <v-text-field
                  density="compact"
                  variant="outlined"
                  label="First Name"
                  placeholder="Enter Your First Name"
                  v-model="formData.firstName"
                  ref="firstName"
                  :rules="rules.firstName"
                />
              </v-col>


              <v-col cols="12" md="12">
                <v-text-field
                  density="compact"
                  variant="outlined"
                  label="Last Name"
                  placeholder="Enter Your Last Name"
                  v-model="formData.lastName"
                  ref="lastName"
                  :rules="rules.lastName"
                />
              </v-col>
            </v-row>
               
                <v-text-field
                  density="compact"
                  variant="outlined"
                  prepend-inner-icon="mdi-email-outline"
                  label="Email Address"
                  placeholder="Enter your Email Address"
                  v-model="formData.email"
                  ref="email"
                  :rules="rules.email"
                />
                <v-text-field
                  density="compact"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="rules.password"
                  placeholder="Enter your password"
                  label="Password"
                  prepend-inner-icon="mdi-lock-outline"
                  v-model="formData.password"
                  variant="outlined"
                  @click:append-inner="showPassword = !showPassword"
                />
                <v-text-field
                  density="compact"
                  variant="outlined"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  v-model="formData.confirmPassword"
                  ref="confirmPassword"
                  :rules="rules.confirmPassword"
                  :append-inner-icon="showConfPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showConfPassword ? 'text' : 'password'"
                   @click:append-inner="showConfPassword = !showConfPassword"
                />
            </v-card-text>
            <v-card-actions class="d-flex flex-row justify-end">
                <v-btn @click="register" color="primary" class="mt-n5 text-white" variant="flat" block>
                  Create Account
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

    <!-- <Verify :userEmail="userEmail" /> -->
  </v-container>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
//import Verify from './Verify.vue';
//import { useAuthStore } from '@/stores/auth';

//const authStore = useAuthStore();

const showPassword = ref(false);
const showConfPassword = ref(false);
const userEmail = ref('');

const route = useRoute();
const category = computed(() => {
  return (route.params && route.params.category);
});
const isTrainee = computed(() => category.value === 'trainee');
const isSupervisor = computed(() => category.value === 'supervisor');

const memberNo = ref('');

const formData = reactive({
  email: '',
  password: '',
  avatar: null,
  memberNo: '',
  firstName: '',
  lastName: '',
  category: category.value,
  confirmPassword: '',
});

const rules = computed(() => ({
  email: [
    (v) => !!v || 'E-mail is required',
    (v) => /.+@.+/.test(v) || 'E-mail must be valid',
  ],
  password: [(v) => !!v || 'Password is required'],
  firstName: [(v) => !!v || 'First Name is required'],
  lastName: [(v) => !!v || 'Last Name is required'],
  confirmPassword: [
    (v) => !!v || 'Password is required',
    (v) => v === formData.password || 'Password does not match',
  ],
}));

const refs = ref({});

function register() {
  let isValid = true;
  for (const key in formData) {
    if (refs.value[key]) isValid = isValid ? refs.value[key].validate(true) : false;
  }
  
  if (isValid) authStore.register({ ...formData });
  userEmail.value = formData.email;
}

function searchMember() {
  // placeholder: wire up backend lookup here
  formData.memberNo = memberNo.value;
  console.log('Searching member no:', memberNo.value);
}
</script>

<style scoped></style>
