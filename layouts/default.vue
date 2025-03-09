<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center">
            <NuxtLink to="/" class="flex-shrink-0 flex items-center">
              <UIcon name="i-heroicons-cube" class="h-8 w-8 text-primary-600" />
              <span class="ml-2 text-xl font-bold text-gray-900 dark:text-white"
                >Nuxt UI Auth</span
              >
            </NuxtLink>
          </div>

          <div class="flex items-center space-x-4">
            <UButton v-if="!user" to="/login" variant="ghost" color="gray">
              Sign in
            </UButton>
            <UButton v-if="!user" to="/register" color="primary">
              Sign up
            </UButton>

            <UButton v-if="user" @click="logout" color="primary">
              Logout
            </UButton>

            <!-- Theme toggle -->
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-moon"
              :padded="false"
              @click="toggleColorMode"
              v-if="colorMode.value === 'light'"
            />
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-sun"
              :padded="false"
              @click="toggleColorMode"
              v-else
            />
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Footer -->
    <footer
      class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="md:flex md:items-center md:justify-between">
          <div class="flex justify-center md:justify-start space-x-6">
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">GitHub</span>
              <UIcon name="i-simple-icons-github" class="h-6 w-6" />
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">Twitter</span>
              <UIcon name="i-simple-icons-twitter" class="h-6 w-6" />
            </a>
          </div>
          <div class="mt-8 md:mt-0">
            <p class="text-center md:text-right text-sm text-gray-500">
              &copy; {{ new Date().getFullYear() }} Nuxt UI Auth Demo. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>

    <!-- Toast notifications -->
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const { user, clear } = useUserSession();

async function logout() {
  await clear();
  await navigateTo("/");
}

function toggleColorMode() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}
</script>
