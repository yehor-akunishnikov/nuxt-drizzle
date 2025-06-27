<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
  layout: "auth",
});

const toast = useToast();
const { fetch: refreshSession } = useUserSession();

const formState = reactive({
  email: "",
  password: "",
});

async function login(event: FormSubmitEvent<LoginPayload>): Promise<void> {
  try {
    await $fetch<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: event.data,
    });

    await refreshSession();
    await navigateTo("/dashboard");
  }
  catch (e) {
    toast.add({
      title: "Failed to login",
      description: "Check your credentials and try again",
      color: "error",
    });
  }
}
</script>

<template>
  <UForm
    :schema="loginValidator"
    :state="formState"
    @submit="login"
  >
    <div class="space-y-4">
      <h1 class="text-center text-lg">
        Login
      </h1>

      <div class="space-y-4">
        <UFormField
          required
          label="Email"
          name="email"
        >
          <UInput
            v-model="formState.email"
            class="w-full"
            placeholder="Email"
            size="lg"
          />
        </UFormField>

        <UFormField
          required
          label="Password"
          name="password"
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
          Login
        </UButton>
        <div class="text-center">
          <ULink
            to="/auth/register"
            class="underline"
          >Register</ULink>
        </div>
      </div>
    </div>
  </UForm>
</template>
