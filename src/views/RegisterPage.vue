<template>
  <div class="flex justify-center items-center h-screen">
    <form
      @submit.prevent="register"
      class="rounded-lg border shadow-lg border-gray-600 p-8 animate-popping-up px-16"
    >
      <h2 class="text-4xl font-semibold mb-6 text-center">Registration</h2>
      <InputCustom
        label="Email"
        v-model="email"
        errorMessage="Email is not valid"
        type="text"
        autocomplete="email"
        @handleInput="validateEmail"
      />
      <InputCustom
        label="Password"
        v-model="password"
        errorMessage="Password min 6 characters"
        type="password"
        autocomplete="password"
        @handleInput="validatePassword"
      />
      <InputCustom
        label="Confirm password"
        v-model="passwordConfirmation"
        errorMessage="Passwords do not match"
        type="password"
        autocomplete="password"
        @handleInput="validatePasswordsMatch"
      />

      <button
        class="w-full mt-8 p-2 rounded"
        type="submit"
        :disabled="isRegisterButtonDisabled || isLoading"
        :class="{
          'bg-blue-500 text-white': !isRegisterButtonDisabled && !isLoading,
          'bg-gray-300 text-gray-500 cursor-not-allowed':
            isRegisterButtonDisabled || isLoading,
        }"
      >
        <template v-if="isLoading">
          <LoadingSpinButton label="Processing..." />
        </template>
        <template v-else> Register </template>
      </button>
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import InputCustom from "@/components/InputCustom.vue";
import LoadingSpinButton from "@/components/LoadingSpinButton.vue";
import { ref, computed } from "vue";

export default {
  name: "RegisterPage",
  components: {
    InputCustom,
    LoadingSpinButton,
  },
  setup() {
    const store = useStore();

    const email = ref("");
    const password = ref("");
    const passwordConfirmation = ref("");
    const isLoading = ref(false);

    const AllValidations = ref({
      email: false,
      password: false,
      passwordConfirmation: false,
    });

    const validateEmail = (isValid) => {
      isValid.value = /\S+@\S+\.\S+/.test(email.value);
      AllValidations.value.email = isValid.value;
    };

    const validatePassword = (isValid) => {
      isValid.value = password.value.length >= 6;
      AllValidations.value.password = isValid.value;
    };

    const validatePasswordsMatch = (isValid) => {
      isValid.value = password.value === passwordConfirmation.value;
      AllValidations.value.passwordConfirmation = isValid.value;
    };

    const isRegisterButtonDisabled = computed(() => {
      return Object.values(AllValidations.value).some((isValid) => !isValid);
    });

    const register = async () => {
      try {
        isLoading.value = true;
        // Wait promise for 10sec
        await new Promise((resolve) => setTimeout(resolve, 10000));
        await store.dispatch("firebaseModule/createUser", {
          email: email.value,
          password: password.value,
        });
      } catch (error) {
        console.error("Błąd rejestracji:", error);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      email,
      password,
      passwordConfirmation,
      validateEmail,
      validatePassword,
      validatePasswordsMatch,
      register,
      isRegisterButtonDisabled,
      isLoading,
    };
  },
};
</script>
