<template>
  <div class="flex justify-center items-center h-screen">
    <form
      @submit.prevent="login"
      class="rounded-lg border shadow-lg border-gray-600 p-8 animate-popping-up px-16"
    >
      <h2 class="text-4xl font-semibold mb-6 text-center">Login</h2>
      <CustomInput
        label="Email"
        v-model="email"
        errorMessage="Email is not valid"
        type="text"
        autocomplete="email"
      />
      <CustomInput
        label="Password"
        v-model="password"
        errorMessage="Password min 6 characters"
        type="password"
        autocomplete="password"
      />

      <CustomButton label="Login" :isLoading="isLoading" :handleClick="login" />
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";
import { ref } from "vue";

export default {
  name: "LoginPage",
  components: {
    CustomInput,
    CustomButton,
  },
  setup() {
    const store = useStore();

    const email = ref("");
    const password = ref("");
    const isLoading = ref(false);

    const login = async () => {
      try {
        isLoading.value = true;
        // Wait promise for 5sec
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await store.dispatch("firebaseModule/login", {
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
      login,
      isLoading,
    };
  },
};
</script>
