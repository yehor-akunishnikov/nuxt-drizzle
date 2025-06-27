<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
  layout: "auth",
});

const toast = useToast();

const formState = reactive({
  email: "",
  name: "",
  password: "",
});

async function register(event: FormSubmitEvent<RegisterPayload>): Promise<void> {
  try {
    await $fetch<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: event.data,
    });

    await navigateTo("/auth/login");
  }
  catch (e) {
    toast.add({
      title: "Failed to register",
      description: "Check your input and try again",
      color: "error",
    });
  }
}
</script>

<template>
  <UForm
    :schema="registerValidator"
    :state="formState"
    @submit="register"
  >
    <div class="space-y-4">
      <h1 class="text-center text-lg">
        Register
      </h1>

      <div class="space-y-4">
        <UFormField
          required
          name="email"
          label="Email"
        >
          <UInput
            v-model="formState.email"
            class="w-full"
            size="lg"
          />
        </UFormField>

        <UFormField
          required
          name="name"
          label="Name"
        >
          <UInput
            v-model="formState.name"
            class="w-full"
            size="lg"
          />
        </UFormField>

        <UFormField
          required
          name="password"
          label="Password"
        >
          <FormPasswordInput
            v-model="formState.password"
            class="w-full"
            size="lg"
          />
        </UFormField>
      </div>

      <div class="space-y-2">
        <UButton
          class="w-full justify-center"
          size="lg"
          type="submit"
        >
          Register
        </UButton>
        <div class="text-center">
          <ULink
            to="/auth/login"
            class="underline"
          >Login</ULink>
        </div>
      </div>
    </div>
  </UForm>
</template>

<style>

</style>
