<template>
  <div class="flex justify-center items-center h-screen">
    <form
      @submit.prevent="register"
      class="rounded-lg border shadow-lg border-gray-600 p-8 animate-popping-up px-16"
    >
      <h2 class="text-4xl font-semibold mb-6 text-center">Registration</h2>

      <div class="mb-8">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
          >E-mail:</label
        >
        <input
          v-model="email"
          @input="validateEmail"
          type="email"
          id="email"
          name="email"
          class="w-full p-2 border rounded"
        />
        <p v-if="!isEmailValid" class="text-red-500 text-xs mt-1 absolute">
          Incorrect mail
        </p>
      </div>

      <div class="mb-8">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2"
          >Password:</label
        >
        <input
          v-model="password"
          @input="validatePassword"
          type="password"
          id="password"
          name="password"
          class="w-full p-2 border rounded"
        />
        <p v-if="!isPasswordValid" class="text-red-500 text-xs mt-1 absolute">
          Password 6 characters long
        </p>
      </div>

      <div class="mb-8">
        <label
          for="passwordConfirmation"
          class="block text-gray-700 text-sm font-bold mb-2"
          >Repeat Password:</label
        >
        <input
          v-model="passwordConfirmation"
          @input="validatePasswordsMatch"
          type="password"
          id="passwordConfirmation"
          name="passwordConfirmation"
          class="w-full p-2 border rounded"
        />
        <p v-if="!doPasswordsMatch" class="text-red-500 text-xs mt-1 absolute">
          Password does not match
        </p>
      </div>

      <button type="submit" class="bg-blue-500 text-white p-2 rounded">
        Register
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "RegisterPage",
  setup() {
    const store = useStore();

    const email = ref("");
    const password = ref("");
    const passwordConfirmation = ref("");
    const isEmailValid = ref(true);
    const isPasswordValid = ref(true);
    const doPasswordsMatch = ref(true);

    const validateEmail = () => {
      isEmailValid.value = /\S+@\S+\.\S+/.test(email.value);
    };

    const validatePassword = () => {
      isPasswordValid.value = password.value.length >= 6;
    };

    const validatePasswordsMatch = () => {
      doPasswordsMatch.value = password.value === passwordConfirmation.value;
    };

    const register = async () => {
      validateEmail();
      validatePassword();
      validatePasswordsMatch();

      if (
        isEmailValid.value &&
        isPasswordValid.value &&
        doPasswordsMatch.value
      ) {
        try {
          const user = await store.dispatch("firebaseModule/createUser", {
            email: email.value,
            password: password.value,
          });
          console.log("Rejestracja udana!", user);
        } catch (error) {
          console.error("Błąd rejestracji:", error);
        }
      }
    };

    return {
      email,
      password,
      passwordConfirmation,
      isEmailValid,
      isPasswordValid,
      doPasswordsMatch,
      validateEmail,
      validatePassword,
      validatePasswordsMatch,
      register,
    };
  },
};
</script>
