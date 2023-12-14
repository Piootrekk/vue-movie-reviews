<template>
  <div class="flex justify-center items-center h-screen">
    <form
      @submit.prevent="register"
      class="rounded-lg border shadow-lg border-gray-600 p-8 animate-popping-up px-16 relative"
    >
      <h2 class="text-4xl font-semibold mb-6 text-center">Register</h2>
      <CustomInput
        v-for="(input, key) in formInputs"
        :key="key"
        :label="input.label"
        v-model="input.value"
        :errorMessage="input.errorMessage"
        :type="input.type"
        :autocomplete="input.autocomplete"
        @handleInput="input.validate"
      />
      <p v-if="errorMessage" class="text-red-500 text-xs w-48 mx-2">
        {{ errorMessage }}
      </p>

      <CustomButton
        label="Register"
        :isButtonDisabled="isRegisterButtonDisabled"
        :isLoading="isLoading"
        :handleClick="register"
        class="w-full"
      />
      <HomeAboutLinks />
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import router from "@/router";
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

    // Define an object for form inputs
    const formInputs = {
      email: {
        label: "Email",
        valueModel: ref(""),
        errorMessage: "Email is not valid",
        type: "text",
        autocomplete: "email",
        validate: validateEmail,
      },
      password: {
        label: "Password",
        valueModel: ref(""),
        errorMessage: "Password min 6 characters",
        type: "password",
        autocomplete: "password",
        validate: validatePassword,
      },
      passwordConfirmation: {
        label: "Confirm password",
        valueModel: ref(""),
        errorMessage: "Passwords do not match",
        type: "password",
        autocomplete: "password",
        validate: validatePasswordsMatch,
      },
    };

    const isLoading = ref(false);
    const errorMessage = ref("");

    const AllValidations = ref({
      email: false,
      password: false,
      passwordConfirmation: false,
    });

    function validateEmail(isValid) {
      isValid.value = /\S+@\S+\.\S+/.test(formInputs.email.value);
      AllValidations.value.email = isValid.value;
    }

    function validatePassword(isValid) {
      isValid.value = formInputs.password.value.length >= 6;
      AllValidations.value.password = isValid.value;
    }

    function validatePasswordsMatch(isValid) {
      isValid.value =
        formInputs.password.value === formInputs.passwordConfirmation.value;
      AllValidations.value.passwordConfirmation = isValid.value;
    }

    const isRegisterButtonDisabled = computed(() => {
      return Object.values(AllValidations.value).some((isValid) => !isValid);
    });

    async function register() {
      try {
        isLoading.value = true;
        await store.dispatch("firebaseAuthModule/createUser", {
          email: formInputs.email.value,
          password: formInputs.password.value,
        });
        router.push("/");
      } catch (error) {
        console.error(error.message);
        errorMessage.value = error.message;
      } finally {
        isLoading.value = false;
      }
    }

    return {
      formInputs,
      isRegisterButtonDisabled,
      isLoading,
      errorMessage,
      register,
    };
  },
};
</script>
