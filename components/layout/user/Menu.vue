<script lang="ts" setup>
import type { DropdownMenuItem } from "@nuxt/ui";

const { user, clear: clearSession } = useUserSession();

const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: "Logout",
      icon: "i-lucide-log-out",
      onSelect: async () => {
        await clearSession();
        await navigateTo("/auth/login");
      },
    },
  ],
]);
</script>

<template>
  <UDropdownMenu
    v-if="user"
    :items="items"
  >
    <UButton
      color="neutral"
      variant="outline"
      class="rounded-full gap-x-2 pl-2 pr-4"
    >
      <UAvatar
        :alt="user.name"
        size="md"
      />
      <span>{{ user.name }}</span>
    </UButton>
  </UDropdownMenu>
</template>

<style>

</style>
