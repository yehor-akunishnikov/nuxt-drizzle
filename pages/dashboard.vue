<script lang="ts" setup>
definePageMeta({
  middleware: ["authenticated"],
});

const { data } = await useFetch<{ message: string }>("/api/data");
</script>

<template>
  <div>
    Dashboard page works
    <pre>{{ data?.message }}</pre>
  </div>
</template>

<style>

</style>
