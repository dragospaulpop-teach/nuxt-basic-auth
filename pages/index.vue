<template>
  <div class="min-h-screen flex flex-col">
    <!-- Hero Section -->
    <section class="bg-white dark:bg-gray-900 py-16 flex-grow">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h1
            class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6"
          >
            Welcome to <span class="text-primary-600">Nuxt UI</span> Demo
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-10">
            A beautiful authentication flow built with Nuxt UI components
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <UButton to="/login" color="primary" size="xl"> Sign in </UButton>
            <UButton to="/register" color="gray" variant="outline" size="xl">
              Create account
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-gray-50 dark:bg-gray-800 py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <h2
            class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
          >
            Authentication Features
          </h2>

          <div class="grid md:grid-cols-3 gap-3">
            <UCard>
              <template #header>
                <div
                  class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-4"
                >
                  <UIcon name="i-heroicons-user-circle" class="h-6 w-6" />
                </div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  User Authentication
                </h3>
              </template>
              <p class="text-gray-600 dark:text-gray-300">
                Complete login and registration flow with form validation
              </p>
            </UCard>

            <UCard>
              <template #header>
                <div
                  class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-4"
                >
                  <UIcon name="i-heroicons-shield-check" class="h-6 w-6" />
                </div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  Password Recovery
                </h3>
              </template>
              <p class="text-gray-600 dark:text-gray-300">
                Secure password reset functionality for account recovery
              </p>
            </UCard>

            <UCard>
              <template #header>
                <div
                  class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-4"
                >
                  <UIcon name="i-heroicons-globe-alt" class="h-6 w-6" />
                </div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  Social Login
                </h3>
              </template>
              <p class="text-gray-600 dark:text-gray-300">
                Sign in with popular social providers like Google and GitHub
              </p>
            </UCard>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Home page doesn't require any specific logic
</script>
