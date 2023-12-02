<template>
  <div class="flex justify-center items-center h-screen">
    <form
      @submit.prevent="login"
      class="rounded-lg border shadow-lg border-gray-600 p-8 animate-popping-up px-16 relative"
    >
      <h2 class="text-4xl font-semibold mb-6 text-center">Login</h2>

      <!-- Use v-for to dynamically create CustomInput components -->
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

      <CustomButton label="Login" :isLoading="isLoading" :handleClick="login" />
      <HomeAboutLinks />
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";
import HomeAboutLinks from "@/components/HomeAboutLinks.vue";
import { ref } from "vue";

export default {
  name: "LoginPage",
  components: {
    CustomInput,
    CustomButton,
    HomeAboutLinks,
  },
  setup() {
    const store = useStore();

    const formInputs = {
      email: {
        label: "Email",
        valueModel: ref(""),
        type: "text",
        autocomplete: "email",
      },
      password: {
        label: "Password",
        valueModel: ref(""),
        type: "password",
        autocomplete: "password",
      },
    };

    const isLoading = ref(false);
    const errorMessage = ref("");

    const login = async () => {
      try {
        isLoading.value = true;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await store.dispatch("firebaseModule/login", {
          email: formInputs.email.value,
          password: formInputs.password.value,
        });
      } catch (error) {
        errorMessage.value = error.message;
      } finally {
        isLoading.value = false;
      }
    };

    return {
      formInputs,
      isLoading,
      errorMessage,
      login,
    };
  },
};
</script>
