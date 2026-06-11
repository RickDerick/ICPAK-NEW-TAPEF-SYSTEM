<template>
    <v-dialog
      v-model="dialog"
      persistent
      width="600"
    >
      <v-card
      >
        <v-card-title class="text-h5 text-center primary lighten-2">
            <v-spacer />
            <h1
                class="text-center mb-3 font-weight-light"
                style="font-size: 40px"
            >
                <p>Verify OTP code</p>
            </h1>
            <v-spacer />
            <p>send to your email</p>
            
        </v-card-title>
        <v-card-text>
          <v-otp-input
            length="6"
            v-model="otp_code"
            @finish="verifyOtp"
            class="mt-6"
          /></v-card-text>

        <v-divider />
        <v-card-actions>
            <v-btn  @click="sendOtp">
                Resend OTP
            </v-btn>
    
            <v-spacer />
    
            <v-btn
                :disabled="otp_code.length < 6"
                @click="verifyOtp"
                color="primary"
              >
                Verify OTP
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '../../../stores/auth';

const props = defineProps({
  userEmail: String,
});

const authStore = useAuthStore();
const otp_code = ref('');

const dialog = computed({
  get() {
    return authStore.authStoreGetters('otpModal');
  },
  set(value) {
    authStore.openOtp(value);
  },
});

function verifyOtp() {
  const data = {
    otp: otp_code.value,
    email: props.userEmail,
  };
  authStore.verifyOtp(data);
}

function sendOtp() {
  const data = {
    email: props.userEmail,
  };
  authStore.sendOtp(data);
}
</script>