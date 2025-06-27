<script setup>
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  },
});
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <UButton
      :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
      color="neutral"
      variant="outline"
      size="xl"
      @click="isDark = !isDark"
    />

    <template #fallback>
      <UButton
        icon="i-lucide-moon"
        color="neutral"
        variant="outline"
        size="xl"
        disabled
      />
    </template>
  </ClientOnly>
</template>
