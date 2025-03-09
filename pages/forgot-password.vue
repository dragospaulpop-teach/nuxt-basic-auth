<template>
  <div
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          Reset your password
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Enter your email address and we'll send you a link to reset your
          password
        </p>
      </div>

      <UCard class="mt-8 p-6">
        <UForm :state="formState" @submit="onSubmit">
          <div class="flex flex-col gap-6">
            <UFormGroup label="Email address" name="email">
              <UInput
                v-model="formState.email"
                type="email"
                placeholder="your@email.com"
                autocomplete="email"
                required
              />
            </UFormGroup>

            <div>
              <UButton
                type="submit"
                color="primary"
                block
                :loading="isLoading"
                :disabled="isLoading"
              >
                Send reset link
              </UButton>
            </div>

            <div class="text-center">
              <UButton variant="link" to="/login" class="text-sm">
                Back to login
              </UButton>
            </div>
          </div>
        </UForm>
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
definePageMeta({
  layout: "auth",
});

interface ForgotPasswordForm {
  email: string;
}

const formState = ref<ForgotPasswordForm>({
  email: "",
});

const isLoading = ref(false);
const isEmailSent = ref(false);
const toast = useToast();

const onSubmit = async () => {
  try {
    isLoading.value = true;

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Here you would typically call your password reset API
    // const { data } = await useFetch('/api/forgot-password', {
    //   method: 'POST',
    //   body: { email: formState.value.email }
    // })

    isEmailSent.value = true;

    toast.add({
      title: "Email sent",
      description: `We've sent a password reset link to ${formState.value.email}`,
      color: "green",
    });

    // Optionally redirect back to login after a delay
    setTimeout(() => {
      navigateTo("/login");
    }, 3000);
  } catch (error) {
    toast.add({
      title: "Error",
      description:
        "There was an error sending the reset link. Please try again.",
      color: "red",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
