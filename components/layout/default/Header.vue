<script lang="ts" setup>
const { loggedIn, user } = useUserSession();
</script>

<template>
  <header class="border py-2 px-4 rounded-md">
    <nav class="flex justify-between items-center">
      <ul class="flex gap-x-4">
        <li>
          <NuxtLink to="/">
            Home
          </NuxtLink>
        </li>
        <li v-if="loggedIn">
          <NuxtLink to="/dashboard">
            Dashboard
          </NuxtLink>
        </li>
      </ul>

      <ul class="flex items-center gap-x-4">
        <li v-if="user">
          <LayoutUserMenu :name="user.name" />
        </li>
        <li v-if="!loggedIn">
          <ULink to="/auth/login">Login</ULink>
        </li>
        <li>
          <CommonColorMode />
        </li>
      </ul>
    </nav>
  </header>
</template>

<style>

</style>
