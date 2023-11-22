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
        type="submit"
        :disabled="isRegisterButtonDisabled"
        class="bg-blue-500 text-white p-2 rounded"
      >
        Register
      </button>
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import InputCustom from "@/components/InputCustom.vue";
import { ref, computed } from "vue";

export default {
  name: "RegisterPage",
  components: {
    InputCustom,
  },
  setup() {
    const store = useStore();

    const email = ref("");
    const password = ref("");
    const passwordConfirmation = ref("");

    const AllValidations = ref({});

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
      if (Object.keys(AllValidations.value).length === 0) return true;
      return Object.values(AllValidations.value).some((isValid) => !isValid);
    });

    const register = async () => {
      try {
        await store.dispatch("firebaseModule/createUser", {
          email: email.value,
          password: password.value,
        });
      } catch (error) {
        console.error("Błąd rejestracji:", error);
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
    };
  },
};
</script>
