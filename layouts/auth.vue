<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Main content -->
    <main>
      <slot />
    </main>

    <!-- Toast notifications -->
    <UNotifications />

    <!-- Theme toggle in corner -->
    <div class="fixed top-4 right-4">
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
</template>

<script setup lang="ts">
const colorMode = useColorMode();

function toggleColorMode() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}
</script>
