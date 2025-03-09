<template>
  <div
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Or
          <NuxtLink
            to="/register"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            create a new account
          </NuxtLink>
        </p>
      </div>

      <UCard class="mt-8 p-6">
        <UForm :state="formState" @submit="onSubmit">
          <div class="flex flex-col gap-3">
            <UFormGroup label="Email address" name="email">
              <UInput
                v-model="formState.email"
                type="email"
                placeholder="your@email.com"
                autocomplete="email"
                required
              />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
              <UInput
                v-model="formState.password"
                type="password"
                placeholder="••••••••"
                autocomplete="current-password"
                required
              />
            </UFormGroup>

            <div class="flex items-center justify-between">
              <UCheckbox
                v-model="formState.remember"
                label="Remember me"
                name="remember"
              />
              <UButton variant="link" to="/forgot-password" class="text-sm">
                Forgot your password?
              </UButton>
            </div>

            <div>
              <UButton
                type="submit"
                color="primary"
                block
                :loading="isLoading"
                :disabled="isLoading"
              >
                Sign in
              </UButton>
            </div>
          </div>
        </UForm>

        <div class="mt-4">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div
                class="w-full border-t border-gray-300 dark:border-gray-700"
              ></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span
                class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400"
              >
                Or continue with
              </span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <UButton
              color="gray"
              variant="outline"
              block
              @click="socialLogin('google')"
            >
              <template #leading>
                <UIcon name="i-simple-icons-google" class="w-5 h-5" />
              </template>
              Google
            </UButton>
            <UButton
              color="gray"
              variant="outline"
              block
              @click="socialLogin('github')"
            >
              <template #leading>
                <UIcon name="i-simple-icons-github" class="w-5 h-5" />
              </template>
              GitHub
            </UButton>
          </div>
        </div>
      </UCard>

      <div class="text-center mt-4">
        <NuxtLink
          to="/"
          class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          ← Back to home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { fetch: refreshSession } = useUserSession();
definePageMeta({
  layout: "auth",
});

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

const formState = ref<LoginForm>({
  email: "test@test.com",
  password: "password",
  remember: false,
});

const isLoading = ref(false);
const toast = useToast();

const onSubmit = async () => {
  try {
    isLoading.value = true;

    const response = await $fetch("/api/login", {
      method: "POST",
      body: {
        email: formState.value.email,
        password: formState.value.password,
      },
    });

    toast.add({
      title: "Success!",
      description: "You have been logged in successfully.",
      color: "green",
    });

    await refreshSession();
    await navigateTo("/protected");

    // Navigate to dashboard or home page after successful login
    // await navigateTo("/");
  } catch (error) {
    toast.add({
      title: "Error",
      description: error.data.message,
      color: "red",
    });
  } finally {
    isLoading.value = false;
  }
};

const socialLogin = (provider: "google" | "github") => {
  toast.add({
    title: "Info",
    description: `${provider} login is not implemented yet.`,
    color: "blue",
  });
};
</script>
