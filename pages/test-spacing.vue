<template>
  <div class="container mx-auto p-8">
    <h1 class="text-2xl font-bold mb-6">Testing Spacing Utilities</h1>

    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Using space-y-6</h2>
      <div class="space-y-6 border border-red-500 p-4">
        <div class="bg-blue-200 p-4 rounded">Item 1</div>
        <div class="bg-blue-200 p-4 rounded">Item 2</div>
        <div class="bg-blue-200 p-4 rounded">Item 3</div>
      </div>
    </div>

    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Using flex and gap-6</h2>
      <div class="flex flex-col gap-6 border border-green-500 p-4">
        <div class="bg-green-200 p-4 rounded">Item 1</div>
        <div class="bg-green-200 p-4 rounded">Item 2</div>
        <div class="bg-green-200 p-4 rounded">Item 3</div>
      </div>
    </div>

    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Using explicit margins</h2>
      <div class="border border-purple-500 p-4">
        <div class="bg-purple-200 p-4 rounded mb-6">Item 1</div>
        <div class="bg-purple-200 p-4 rounded mb-6">Item 2</div>
        <div class="bg-purple-200 p-4 rounded">Item 3</div>
      </div>
    </div>

    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">
        Using Nuxt UI components with space-y-6
      </h2>
      <div class="space-y-6 border border-blue-500 p-4">
        <UCard>
          <div>Card 1 Content</div>
        </UCard>
        <UCard>
          <div>Card 2 Content</div>
        </UCard>
        <UCard>
          <div>Card 3 Content</div>
        </UCard>
      </div>
    </div>

    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-4">
        Using Nuxt UI components with flex and gap-6
      </h2>
      <div class="flex flex-col gap-6 border border-yellow-500 p-4">
        <UCard>
          <div>Card 1 Content</div>
        </UCard>
        <UCard>
          <div>Card 2 Content</div>
        </UCard>
        <UCard>
          <div>Card 3 Content</div>
        </UCard>
      </div>
    </div>

    <div class="mt-8">
      <UButton to="/" color="primary">Back to Home</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
// No specific logic needed
</script>
