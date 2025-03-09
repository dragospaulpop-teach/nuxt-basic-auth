<template>
  <div>
    <h1>Protected Page</h1>
    <p>Welcome, {{ user?.name ?? "Guest" }}</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "authenticated",
});

const { user } = useUserSession();
</script>
