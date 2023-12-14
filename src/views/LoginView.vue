<script setup>
import { useStore } from "vuex";
import router from "@/router";
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";
import HomeAboutLinks from "@/components/HomeAboutLinks.vue";
import { ref } from "vue";

const store = useStore();

const formInputs = ref({
  email: {
    label: "Email",
    type: "text",
    autocomplete: "email",
  },
  password: {
    label: "Password",
    type: "password",
    autocomplete: "password",
  },
});

const isLoading = ref(false);
const errorMessage = ref("");

const login = async () => {
  try {
    isLoading.value = true;
    await store.dispatch("firebaseAuthModule/login", {
      email: formInputs.value.email.value,
      password: formInputs.value.password.value,
    });
    router.push("/");
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <form
      @submit.prevent="login"
      class="rounded-lg border shadow-lg border-gray-600 p-8 animate-popping-up px-16 relative"
    >
      <h2 class="text-4xl font-semibold mb-6 text-center">Login</h2>
      <CustomInput
        v-for="(input, key) in formInputs"
        :key="key"
        :label="input.label"
        v-model="input.value"
        :type="input.type"
        :autocomplete="input.autocomplete"
      />

      <p v-if="errorMessage" class="text-red-500 text-xs w-48 mx-2">
        {{ errorMessage }}
      </p>

      <CustomButton
        label="Login"
        :isLoading="isLoading"
        :handleClick="login"
        class="w-full"
      />
      <HomeAboutLinks />
    </form>
  </div>
</template>
