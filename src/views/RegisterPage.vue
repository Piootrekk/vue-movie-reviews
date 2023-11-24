<template>
  <div class="flex justify-center items-center h-screen">
    <form
      @submit.prevent="register"
      class="rounded-lg border shadow-lg border-gray-600 p-8 animate-popping-up px-16"
    >
      <h2 class="text-4xl font-semibold mb-6 text-center">Register</h2>
      <CustomInput
        label="Email"
        v-model="email"
        errorMessage="Email is not valid"
        type="text"
        autocomplete="email"
        @handleInput="validateEmail"
      />
      <CustomInput
        label="Password"
        v-model="password"
        errorMessage="Password min 6 characters"
        type="password"
        autocomplete="password"
        @handleInput="validatePassword"
      />
      <CustomInput
        label="Confirm password"
        v-model="passwordConfirmation"
        errorMessage="Passwords do not match"
        type="password"
        autocomplete="password"
        @handleInput="validatePasswordsMatch"
      />

      <CustomButton
        label="Register"
        :isButtonDisabled="isRegisterButtonDisabled"
        :isLoading="isLoading"
        :handleClick="register"
      />
      <HomeAboutLinks />
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";
import HomeAboutLinks from "@/components/HomeAboutLinks.vue";
import { ref, computed } from "vue";

export default {
  name: "RegisterPage",
  components: {
    CustomInput,
    CustomButton,
    HomeAboutLinks,
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
        // Wait promise for 5sec
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await store.dispatch("firebaseModule/createUser", {
          email: email.value,
          password: password.value,
        });
      } catch (error) {
        console.error(error.message);
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
