<template>
  <div
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Already have an account?
          <NuxtLink
            to="/login"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            Sign in
          </NuxtLink>
        </p>
      </div>

      <UCard class="mt-8 p-6">
        <UForm :state="formState" @submit="onSubmit">
          <div class="flex flex-col gap-6">
            <div class="grid grid-cols-2 gap-4">
              <UFormGroup label="First name" name="firstName">
                <UInput
                  v-model="formState.firstName"
                  placeholder="John"
                  autocomplete="given-name"
                  required
                />
              </UFormGroup>

              <UFormGroup label="Last name" name="lastName">
                <UInput
                  v-model="formState.lastName"
                  placeholder="Doe"
                  autocomplete="family-name"
                  required
                />
              </UFormGroup>
            </div>

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
                autocomplete="new-password"
                required
              />
              <template #hint>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Password must be at least 8 characters and include a number
                  and a special character
                </p>
              </template>
            </UFormGroup>

            <UFormGroup label="Confirm password" name="confirmPassword">
              <UInput
                v-model="formState.confirmPassword"
                type="password"
                placeholder="••••••••"
                autocomplete="new-password"
                required
              />
            </UFormGroup>

            <UFormGroup name="terms">
              <UCheckbox
                v-model="formState.terms"
                name="terms"
                label="I agree to the Terms of Service and Privacy Policy"
              >
              </UCheckbox>
            </UFormGroup>

            <div>
              <UButton
                type="submit"
                color="primary"
                block
                :loading="isLoading"
                :disabled="isLoading"
              >
                Create account
              </UButton>
            </div>
          </div>
        </UForm>

        <div class="mt-6">
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
                Or register with
              </span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <UButton
              color="gray"
              variant="outline"
              block
              @click="socialRegister('google')"
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
              @click="socialRegister('github')"
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
definePageMeta({
  layout: "auth",
});

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const formState = ref<RegisterForm>({
  firstName: "Test",
  lastName: "User",
  email: "test@test.com",
  password: "password",
  confirmPassword: "password",
  terms: true,
});

const isLoading = ref(false);
const toast = useToast();

const onSubmit = async () => {
  try {
    // Basic validation
    if (formState.value.password !== formState.value.confirmPassword) {
      toast.add({
        title: "Error",
        description: "Passwords do not match",
        color: "red",
      });
      return;
    }

    if (formState.value.password.length < 8) {
      toast.add({
        title: "Error",
        description: "Password must be at least 8 characters",
        color: "red",
      });
      return;
    }

    isLoading.value = true;

    await $fetch("/api/register", {
      method: "POST",
      body: {
        firstName: formState.value.firstName,
        lastName: formState.value.lastName,
        email: formState.value.email,
        password: formState.value.password,
        confirmPassword: formState.value.confirmPassword,
        terms: formState.value.terms,
      },
    });

    toast.add({
      title: "Success!",
      description: "Your account has been created. You can now log in.",
      color: "green",
    });

    // Navigate to login page after successful registration
    await navigateTo("/login");
  } catch (error) {
    toast.add({
      title: "Error",
      description: (error as any).data.message,
      color: "red",
    });
  } finally {
    isLoading.value = false;
  }
};

const socialRegister = (provider: "google" | "github") => {
  toast.add({
    title: "Info",
    description: `${provider} registration is not implemented yet.`,
    color: "blue",
  });
};
</script>
