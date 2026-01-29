<script setup>
import createCard from "@/components/createCard.vue";
import { onMounted } from "vue";
import { useAuth } from "@/composables/useAuth";
import { useUser } from "@/composables/useUser";

const { user } = useUser();

const { getSession } = useAuth();

onMounted(() => {
  getSession();
});
</script>

<template>
  <main>
    <div class="container">
      <createCard v-if="Object.keys(user).length" :user="user" class="mt-3" />
      <div v-else>
        <h1>Inicia sesión enviar una carta</h1>
      </div>
    </div>
  </main>
</template>
